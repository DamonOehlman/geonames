var geonames = require('..');
var path = require('path');
var pull = require('pull-stream');
var pluck = require('whisk/pluck');

pull(
  geonames.read(path.resolve(__dirname, '../data/AU.txt')),
  pull.filter(function(item) {
    return item.featureClass === 'P' && item.population > 50000
  }),
  pull.map(pluck('name')),
  pull.take(10),
  pull.log()
);