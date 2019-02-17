var michelin = require('./michelin');
var jsonfile = require('jsonfile');

jsonfile.readFile('output/1_restaurants_list.json', function (err, restaurants) {
    //getting the address of the restaurants and put it in "liste2.json"
    michelin.getAllAddresses(restaurants);
});