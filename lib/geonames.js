var parser = require('./core/parser');

function geonames() {
    
}

// export the parser if we are working with node
geonames.read = parser;

module.exports = geonames;