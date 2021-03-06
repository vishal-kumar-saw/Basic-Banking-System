const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const User = require('./models/user');
const Transaction = require('./models/transaction');
const dotenv = require('dotenv');
if (process.env.NODE_ENV !== "production") {
    require('dotenv').config();
}
const port = process.env.PORT || 3000;
const dbUrl = process.env.DB_URL;
// mongoose.connect('mongodb://localhost:27017/',
//     {
//         useNewUrlParser: true,
//         useCreateIndex: true,
//         useUnifiedTopology: true
//     });
mongoose.connect(dbUrl, { useNewUrlParser: true });
const conn = mongoose.connection;
mongoose.connection.once('open', () => { console.log('MongoDB Connected'); });
mongoose.connection.on('error', (err) => { console.log('MongoDB connection error: ', err); });

// const db = mongoose.connection;
// db.on("error", console.error.bind(console, "connection error:"));
// db.once("open", () => {
//     console.log("Database connected");
// });


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
mongoose.set('useFindAndModify', false);
app.use(express.static(path.join(__dirname, "/public")));
app.use(express.json());

app.get("/", (req, res) => {
    res.render('index');
});

app.get("/view", async (req, res) => {
    const users = await User.find({})
    res.render('view', { users });
});

app.get("/history", async (req, res) => {
    const transactions = await Transaction.find({});
    res.render('history', { transactions });
});

app.get("/view/:id", async (req, res) => {
    const { id } = req.params;
    const user = await User.findById(id);
    const users = await User.find({})
    res.render('transfer', { user, users });
});

app.get("/view/:id1/:id2", async (req, res) => {
    const { id1, id2 } = req.params;
    const fromUser = await User.findById(id1);
    const toUser = await User.findById(id2);
    res.render('form', { fromUser, toUser });
});

app.put("/view/:id1/:id2", async (req, res) => {
    const { id1, id2 } = req.params;
    const credit = parseInt(req.body.credit);
    const fromUser = await User.findById(id1);
    const toUser = await User.findById(id2);

    if (credit <= fromUser.credits && credit > 0) {

        let fromCreditsNew = fromUser.credits - credit;
        let toCreditsNew = parseInt(toUser.credits + credit);
        await User.findByIdAndUpdate(id1, { credits: fromCreditsNew }, { runValidators: true, new: true });
        await User.findByIdAndUpdate(id2, { credits: toCreditsNew }, { runValidators: true, new: true });

        let newTransaction = new Transaction();
        newTransaction.fromName = fromUser.name;
        newTransaction.toName = toUser.name;
        newTransaction.transfer = credit;
        await newTransaction.save();

        res.redirect('/view');
    }
    else {
        res.render('error');
    }
});


app.listen(port, () => {
    console.log("SERVER STARTED !");
});


// 