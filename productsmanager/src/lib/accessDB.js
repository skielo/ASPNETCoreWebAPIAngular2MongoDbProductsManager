// Module dependencies
var util = require('util'),
    mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    dbConfig = require('./configLoader').databaseConfig,
    connectionString = 'mongodb://' + dbConfig.host + '/' + dbConfig.database,
    connection = null;

// connect to database
module.exports = {
    // Define class variable
    myEventID: null,

    // initialize DB
    startup: function (callback) {
        mongoose.connect(connectionString);
        connection = mongoose.connection;
        mongoose.Promise = global.Promise;
        mongoose.connection.on('open', function () {
            console.log('We have connected to mongodb');
            callback();
        });

    },

    // disconnect from database
    close: function () {
        connection.close(function () {
            console.log('Mongoose default connection disconnected through app termination');
            process.exit(0);
        });
    },
}
