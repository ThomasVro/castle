var michelin = require('./michelin');
var jsonfile = require('jsonfile');

jsonfile.readFile('JSONFiles/restaurants.json', function (err, restaurants) {
    michelin.getAllAddresses(restaurants);
});