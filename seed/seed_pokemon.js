import mongoose from 'mongoose';

var env = 'development', configDB = require('./config/db')[env]; // Get db config file.
//var env = 'production', configDB = require('./config/db')[env]; // Get db config file.

// MongoDB connection.
mongoose.connect(configDB.url, function (error) {
    if (error) console.error(error);
    else console.log('Mongo connected.');
});

// Seed users.

var users = [

    {
        "name" : "Ana",
        "created" : ISODate("2017-05-16T09:05:30.747Z"),
        "caught" : [
            "Snorlax"
        ]
    },
    {
        "name" : "Paco",
        "created" : ISODate("2017-05-18T09:45:44.353Z"),
        "caught" : [
            "Bulbasur",
            "Raticate"
        ]
    },
    {
        "name" : "Juan",
        "created" : ISODate("2017-05-18T09:49:18.124Z"),
        "caught" : [
            "Pikachu",
            "Raticate",
            "Charmander",
            "Snorlax"
        ]
    }
];

// Drop users collection.

mongoose.connection.collections['users'].drop( function(err) {

    User.create(users, function(err, res){

        if (err) {
            console.log(err);
        }
        else {
            console.log('Seed data created.');
        }

        process.exit();

    });

});
