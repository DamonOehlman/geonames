var geonames = require('../lib/geonames'),
    filterstream = require('filterstream'),
    path = require('path'),
    dataPath = path.resolve(__dirname, '../data'),
    expect = require('expect.js'),
    testItems = [];

describe('piping / filtering tests', function() {
    it('should be able to filter data based on featureClass', function(done) {
        geonames
            .read(path.join(dataPath, 'BV.txt'))
            .pipe(filterstream('featureClass == A'))
            .on('data', function(item) {
                expect(item).to.be.ok();
                testItems.push(item);
            })
            .on('end', function() {
                expect(testItems).to.have.length(2);
                done();
            });
    });
});