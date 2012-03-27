//@header
(function (glob) {
    
    //= core/definition
    
    function geonames() {
        
    }
    
    // export the parser if we are working with node
    if (typeof parser != 'undefined') {
        geonames.parser = parser;
    }
    
    //@export geonames
})(this);