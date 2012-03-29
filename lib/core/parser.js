var Definition = require('./definition'),
    csv = require('csv'),
    debug = require('debug')('geonames-parser'),
    fieldMappings = [
        'id',
        'name',
        'asciiname',
        'alternatenames',
        'lat',
        'lon'
    ],
    translators = [
        parseInt,
        null,
        null,
        null,
        parseFloat,
        parseFloat
    ],
    fieldCount = fieldMappings.length;

exports = module.exports = function(targetFile, callback) {
    var items = [],
        ii,
        startTick = Date.now();
    
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
            
            // add the item to the list of items
            items.push(item);
        })
        .on('error', function(error) {
            callback(error);
        })
        .on('end', function(count) {
            debug('parsed ' + count + ' items in ' + (Date.now() - startTick) + 'ms');
            
            callback(null, items);
        });
};