var matchme = require('matchme'),
    parser = require('./core/parser');

function geonames() {
    
}

// export the parser if we are working with node
geonames.parser = parser;

module.exports = geonames;