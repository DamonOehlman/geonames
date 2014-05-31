var geonames = require('..');
var path = require('path');
var dataPath = path.resolve(__dirname, '../data');
var test = require('tape');
var testItems = [];
var pull = require('pull-stream');

test('parse the Australia geonames file', function(t) {
  var stream;

  t.plan(2);
  t.ok(stream = geonames.read(path.join(dataPath, 'AU.txt')), 'have stream');

  pull(stream, pull.collect(function(err, items) {
    t.equal(items.length, 105367, 'got expected number of items');
  }));
});
