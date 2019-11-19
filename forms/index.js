const fs = require('fs');
const {DOMParser} = require('xmldom');

const {
  walkDOMUp,
  walkDOMDown,
} = require('./walkers.js');


const {nodeMatches} = require('./matches.js');
const {pathMatches} = require('./match_path.js');

const f = fs.readFileSync('../schema/0.02/schema.rng', 'utf8');
const parser = new DOMParser();
const document = parser.parseFromString(f, 'text/xml');
const define = document.getElementsByTagName('define');
const product = define[0];

const parseDotPath = (node, parents) => {
  const repr = pathMatches(node);
  return repr ? `${parents}.${repr}` : parents;
};

const parseRng = (node, inject) => {
  const transformFunction = nodeMatches(node);
  console.log(walkDOMUp(parseDotPath, node));
  return transformFunction(node, inject);
};

const rs = walkDOMDown(parseRng, product);

console.log(rs);
//copy and paste rs and put it in to a .html file
