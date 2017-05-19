import mongoose from 'mongoose';

var env = 'development';
//var env = 'production';

import { databaseConfig } from '../config/config'

// MongoDB connection.
mongoose.Promise = global.Promise;
mongoose.connect(databaseConfig[env].url, function (error) {
    if (error) console.error(error);
    else console.log('Mongo connected.');
});
