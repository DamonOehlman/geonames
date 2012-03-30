var Definition = require('./definition'),
    csv = require('csv'),
    debug = require('debug')('geonames-parser'),
    Stream = require('stream').Stream,
    fieldMappings = [
        'id',
        'name',
        'asciiname',
        'alternativeNames',
        'lat',
        'lon',
        'featureClass',
        'featureCode',
        'country',
        null, // alternate country codes
        null, // admin code 1
        'countrySubdivision',
        'municipality',
        'municipalitySubdivision',
        'population',
        'elevation',
        'dem',
        'tz',
        'lastModified'
    ],
    translators = [
        parseInt,
        null,
        null,
        null,
        // lat and lon
        parseFloat,
        parseFloat,
        // feature class and code
        null,
        null,
        // country codes
        null,
        null,
        // admin codes 1 - 4
        null,
        null,
        null,
        null,
        // population and elevation
        parseFloat,
        parseFloat,
        // dem
        null,
        // timezone
        null,
        // last modified
        null
    ],
    fieldCount = fieldMappings.length;
    
exports = module.exports = function(targetFile) {
    var ii,
        startTick = Date.now(),
        stream = new Stream();
    
    csv()
        .fromPath(targetFile, { delimiter: '\t' })
        .on('data', function(records, index) {
            var item = new Definition();
            
            // iterate through the field mappings
            for (ii = fieldCount; ii--; ) {
                if (fieldMappings[ii]) {
                    item[fieldMappings[ii]] = translators[ii] ? translators[ii](records[ii]) : records[ii];
                }
            }
            
            stream.emit('data', item);
        })
        .on('error', function(error) {
            stream.emit('error', error);
        })
        .on('end', function(count) {
            debug('parsed ' + count + ' items in ' + (Date.now() - startTick) + 'ms');
            stream.emit('end');
        });
        
    return stream;
};