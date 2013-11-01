# geonames

This is a simple module designed to assist with working with
[geonames](http://geonames.org) data files.


[![NPM](https://nodei.co/npm/geonames.png)](https://nodei.co/npm/geonames/)

[![Build Status](https://travis-ci.org/DamonOehlman/geonames.png?branch=master)](https://travis-ci.org/DamonOehlman/geonames)

## Example Usage

```js
var geonames = require('geonames');
var path = require('path');
var pull = require('pull-stream');
var pluck = require('whisk/pluck');

pull(
  geonames.read(path.resolve(__dirname, '../data/AU.txt')),
  pull.filter(function(item) {
    return item.featureClass === 'P' && item.population > 50000
  }),
  pull.map(pluck('name')),
  pull.take(10),
  pull.log()
);
```

## License(s)

### MIT

Copyright (c) 2013 Damon Oehlman <damon.oehlman@gmail.com>

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
