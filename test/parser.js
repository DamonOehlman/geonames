var geonames = require('../lib/geonames'),
    path = require('path'),
    dataPath = path.resolve(__dirname, '../data'),
    expect = require('expect.js'),
    testItems;

describe('parser tests', function() {
    it('should be able to the Bouvet Island geonames file', function(done) {
        var stream = geonames.read(path.join(dataPath, 'BV.txt'));
        
        // initialise the testItems
        testItems = [];
        
        // when we get a data item push it to the test item array
        stream.on('data', function(item) {
            expect(item).to.be.ok();
            testItems.push(item);
        });
        
        stream.on('end', function() {
            expect(testItems).to.have.length(48);
            done();
        });
    });

    it('the first item should match the file contents', function() {
        expect(testItems[0]).to.be.ok();
        expect(testItems[0].id).to.equal(3371096);
        expect(testItems[0].name).to.equal('Williams Reef');
    });
});