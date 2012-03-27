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