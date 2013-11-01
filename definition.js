/* jshint node: true */
'use strict';

function GeonamesDefinition(source) {
  if (! (this instanceof GeonamesDefinition)) {
    return new GeonamesDefinition(source);
  }

  // ensure we have source data
  source = source || {};

  // initialise values
  this.id = source.id;
  this.name = source.name || '';
};

module.exports = GeonamesDefinition;

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