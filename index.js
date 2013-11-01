/* jshint node: true */
'use strict';

var Definition = require('./definition');
var fs = require('fs');
var debug = require('debug')('geonames-parser');
var file = require('pull-file');
var pull = require('pull-stream');
var bits = require('pull-tobits');


/**
  # geonames

  This is a simple module designed to assist with working with
  [geonames](http://geonames.org) data files.

  ## Example Usage

  <<< examples/au-places.js

**/

var fieldMappings = [
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
];

var translators = [
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
];

var fieldCount = fieldMappings.length;

exports.read = function(inputFile) {
  var count = 0;

  return pull(
    file(inputFile),
    bits.split([0x0A]),
    pull.map(function(line) {
      if (! (line instanceof Buffer)) {
        console.log(line);
      }

      var records = line.toString().split('\t');
      var item = new Definition();

      // iterate through the field mappings
      for (var ii = fieldCount; ii--; ) {
        if (fieldMappings[ii]) {
          item[fieldMappings[ii]] = translators[ii] ?
            translators[ii](records[ii]) :
            records[ii];
        }
      }

      return item;
    })
  );
};