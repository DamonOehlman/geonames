var geonames = require('..');
var path = require('path');
var pull = require('pull-stream');
var pluck = require('whisk/pluck');

pull(
  geonames.read(path.resolve(__dirname, '../data/AU.txt')),
  pull.filter(function(item) {
    return item.featureClass === 'P' && item.population > 50000
  }),
  pull.map(pluck('name', 'population')),
  pull.take(10),
  pull.log()
);

/* -->
{ name: 'Perth', population: 1446704 }
{ name: 'Mandurah', population: 73356 }
{ name: 'Darwin', population: 93080 }
{ name: 'Adelaide', population: 1074159 }
{ name: 'Wagga Wagga', population: 55381 }
{ name: 'Townsville', population: 138954 }
{ name: 'Toowoomba', population: 92800 }
{ name: 'Sydney', population: 4394576 }
{ name: 'Rockhampton', population: 65850 }
{ name: 'Nowra', population: 94781 }
*/