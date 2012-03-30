function GeonamesDefinition(source) {
    // ensure we have source data
    source = source || {};
    
    // initialise values
    this.id = source.id;
    this.name = source.name || '';
};

if (typeof module != 'undefined') {
    module.exports = GeonamesDefinition;
}

Object.defineProperty(GeonamesDefinition.prototype, 'alternativeNames', {
    set: function(value) {
        if (typeof value == 'string' || value instanceof String) {
            this.altNames = value.split(/\,\s*/);
        }
        else {
            this.altNames = value;
        }
    }
});