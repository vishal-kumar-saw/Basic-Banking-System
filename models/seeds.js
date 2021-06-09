const mongoose = require('mongoose');
const User = require('./user');

//. DB - test //
//. COLLECTION - users //

mongoose.connect('mongodb://localhost:27017/', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("MONGO CONNECTION OPEN!!!")
    })
    .catch(err => {
        console.log("OH NO MONGO CONNECTION ERROR!!!!")
        console.log(err)
    })



const seedUsers = [
    {
        name: 'Varun',
        email: 'varun@gmail.com',
        credits: 1000
    },
    {
        name: 'Vishal',
        email: 'Vishal@hotmail.com',
        credits: 7000
    },
    {
        name: 'Vinayak',
        email: 'vinayak@gmail.com',
        credits: 4400
    },
    {
        name: 'Shivam',
        email: 'Shivam@yahoo.com',
        credits: 8500
    },
    {
        name: 'Ashutosh',
        email: 'Ashutosh@gmail.com',
        credits: 7500
    },
    {
        name: 'Piyush',
        email: 'Piyush@yahoo.com',
        credits: 7980
    },
    {
        name: 'Muskan',
        email: 'Muskan@gmail.com',
        credits: 9000
    },
    {
        name: 'Naman',
        email: 'naman32@yahoo.com',
        credits: 8100
    },
    {
        name: 'Vijay',
        email: 'vijay@gmail.com',
        credits: 9500
    },
    {
        name: 'Mayank',
        email: 'mayank@hotmail.com',
        credits: 2700
    }
]

User.insertMany(seedUsers)
    .then(res => console.log(res))
    .catch(err => console.log(err))

// User.deleteMany({}).then(() => {
//     console.log("Deleted");
// })
