var matchme = require('matchme'),
    parser = require('./src/node/parser');

// geonames 0.0.1
// ────────────────────────────────────────────────────────────────────────────────────────
// Utilities for working with geonames.org data
// ────────────────────────────────────────────────────────────────────────────────────────

(function (glob) {
    
    function GeonamesDefinition(source) {
        // ensure we have source data
        source = source || {};
        
        // initialise values
        this.id = source.id;
        this.name = source.name || '';
    };

    
    function geonames() {
        
    }
    
    // export the parser if we are working with node
    if (typeof parser != 'undefined') {
        geonames.parser = parser;
    }
    
    (typeof module != "undefined" && module.exports) ? (module.exports = geonames) : (typeof define != "undefined" ? (define("geonames", [], function() { return geonames; })) : (glob.geonames = geonames));
})(this);
