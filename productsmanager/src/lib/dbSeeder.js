// Module dependencies
var mongoose = require('mongoose'),
   Schema = mongoose.Schema,
   Product = require('../models/products'),
   State = require('../models/state'),
   util = require('util'),
   dbConfig = require('./configLoader').databaseConfig,
   connectionString = 'mongodb://' + dbConfig.host + '/' + dbConfig.database,
   connection = null;

var dbSeeder = function() {
    
    var init = function() {
        // mongoose.connect(connectionString);
        // connection = mongoose.connection;
        // mongoose.connection.on('open', function () {

        // });
        mongoose.connection.db.listCollections({name: 'Products'})
            .next(function(err, collinfo) {
                if (!collinfo) {
                    console.log('Starting dbSeeder...');
                    seed();
                }
            });
    },
    
    seed = function() {

        console.log('Seeding data....');

        var products =
        [
        { "ProductId":1,"ProductName": "Basket", "Price": 29.99, "Category": "Electronics" },
        { "ProductId":2,"ProductName": "Yarn", "Price": 9.99, "Category": "Electronics" },
        { "ProductId":3,"ProductName": "Needes", "Price": 5.99, "Category": "Electronics" },
        { "ProductId":4,"ProductName": "Speakers", "Price": 499.99, "Category": "Electronics" },
        { "ProductId":5,"ProductName": "iPod", "Price": 399.99, "Category": "Electronics" },
        { "ProductId":6,"ProductName": "Table", "Price": 329.99, "Category": "Electronics" },
        { "ProductId":7,"ProductName": "Chair", "Price": 129.99, "Category": "Electronics" },
        { "ProductId":8,"ProductName": "Lamp", "Price": 89.99, "Category": "Electronics" },
        { "ProductId":9,"ProductName": "Call of Duty", "Price": 59.99, "Category": "Electronics" },
        { "ProductId":10,"ProductName": "Controller", "Price": 49.99, "Category": "Electronics" },
        { "ProductId":11,"ProductName": "Gears of War", "Price": 49.99, "Category": "Electronics" },
        { "ProductId":12,"ProductName": "Lego City", "Price": 49.99, "Category": "Electronics" },
        { "ProductId":13,"ProductName": "Baseball", "Price": 9.99, "Category": "Electronics" },
        { "ProductId":14,"ProductName": "Bat", "Price": 19.99, "Category": "Electronics" }
        ];

        Product.remove({});

        var l = products.length,
            i,
            j
        for (i = 0; i < l; i++) {
            let product = new Product({
                    "ProductId": products[i].ProductId,
                    "ProductName": products[i].ProductName,
                    "Price": products[i].Price,
                    "Category": products[i].Category
                });

            product.save(function (err, prod) {
                if (err) {
                    console.log(err);
                } else {
                    console.log('inserted Product: ' + prod.ProductName);
                }
            });
        }c
    };
    
    return {
        init: init,
        seed: seed
    }
}();

module.exports = dbSeeder;




