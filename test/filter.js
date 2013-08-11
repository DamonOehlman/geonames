var geonames = require('..');
var path = require('path');
var dataPath = path.resolve(__dirname, '../data');
var test = require('tape');
var testItems = [];
var pull = require('pull-stream');

test('filter data based on featureClass', function(t) {
  var stream;

  t.plan(3);
  t.ok(stream = geonames.read(path.join(dataPath, 'BV.txt')), 'have stream');

  pull(
    stream,
    pull.filter(function(item) {
      return item.featureClass == 'A';
    }),
    pull.drain(function(item) {
      testItems.push(item);
      t.ok(item, 'have item');
    })
  );
});

test('first matching item matches expected', function(t) {
  t.plan(2);
  t.ok(testItems[0], 'have item');
  t.equal(testItems[0].id, 3371123);
});