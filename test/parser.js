var geonames = require('../lib/geonames'),
    path = require('path'),
    dataPath = path.resolve(__dirname, '../data'),
    expect = require('expect.js'),
    testItems;

describe('parser tests', function() {
    it('should be able to the Bouvet Island geonames file', function(done) {
        geonames.parser(path.join(dataPath, 'BV.txt'), function(err, items) {
            expect(err).to.not.be.ok();
            expect(testItems = items).to.have.length(48);
            
            done();
        });
    });

    it('the first item should match the file contents', function() {
        expect(testItems[0]).to.be.ok();
        expect(testItems[0].id).to.equal(3371096);
        expect(testItems[0].name).to.equal('Williams Reef');
        
        console.log(testItems[0]);
    });
});