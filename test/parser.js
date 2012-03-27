var geonames = require('../geonames.node'),
    path = require('path'),
    dataPath = path.resolve(__dirname, '../data'),
    expect = require('expect.js');

describe('parser tests', function() {
    it('should be able to the Bouvet Island geonames file', function(done) {
        geonames.parser(path.join(dataPath, 'BV.txt'), function(err, items) {
            expect(err).to.not.be.ok();
            expect(items).to.have.length(48);
            
            done();
        });
    });
});