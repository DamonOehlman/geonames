var geonames = require('..');
var path = require('path');
var dataPath = path.resolve(__dirname, '../data');
var test = require('tape');
var testItems = [];
var pull = require('pull-stream');

test('parse the Bouvet Island geonames file', function(t) {
  var stream;

  t.plan(51);

  t.ok(stream = geonames.read(path.join(dataPath, 'BV.txt')), 'have stream');

  pull(stream, pull.drain(function(item) {
    console.log(item);
    testItems.push(item);
    t.ok(item, 'have item');
  }));
});

// test('first item should match file contents', function(t) {
//   t.plan(3);
//   t.ok(testItems[0], 'have item');
//   t.equal(testItems[0].id, 3371096);
//   t.equal(testItems[0].name, 'Williams Reef');
// });