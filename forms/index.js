const fs = require('fs');
const {DOMParser} = require('xmldom');

const {
  walkDOMUp,
  walkDOMDown,
} = require('./walkers.js');

const {
  parseDotPath,
  parseRng,
} = require('./parsers.js');

const f = fs.readFileSync('../schema/0.02/schema.rng', 'utf8');
const parser = new DOMParser();
const document = parser.parseFromString(f, 'text/xml');
const define = document.getElementsByTagName('define');
const product = define[0];

const rs = walkDOMDown(parseRng, product);

console.log(rs);
//copy and paste rs and put it in to a .html file
