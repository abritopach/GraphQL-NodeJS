import mongoose from 'mongoose';

var env = 'development';
//var env = 'production';

import { databaseConfig } from '../config/config'

import User from '../models/pokemon/user';

// MongoDB connection.
mongoose.Promise = global.Promise;
mongoose.connect(databaseConfig[env].url, function (error) {
    if (error) console.error(error);
    else console.log('Mongo connected.');
});


// Seed users.

var users = [

    {
        "name" : "Ana",
        "created" : Date.now(),
        "caught" : [
            "Snorlax"
        ]
    },
    {
        "name" : "Paco",
        "created" : Date.now(),
        "caught" : [
            "Bulbasur",
            "Raticate"
        ]
    },
    {
        "name" : "Juan",
        "created" : Date.now(),
        "caught" : [
            "Pikachu",
            "Raticate",
            "Charmander",
            "Snorlax"
        ]
    }
];

// Drop users collection.

User.remove({}, function(err, result) {
    if (err) {
        console.log("Collection couldn't be removed" + err);
        return;
    }

    console.log("Collection removed.");

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
