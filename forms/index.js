const fs = require('fs');
const _ = require('lodash/fp');
const {DOMParser} = require('xmldom');

const {
  values,
  curry,
  map,
  filter,
  has,
} = _;

const {nodeMatches} = require('./matches.js');

const f = fs.readFileSync('../schema/0.02/schema.rng', 'utf8');
const parser = new DOMParser();
const document = parser.parseFromString(f, 'text/xml');
const define = document.getElementsByTagName('define');
const product = define[3];

const walkDOM = curry((func, node) => {
  const filterchildren = filter(has('tagName'));
  const children = node.hasChildNodes ?
    map(
      walkDOM(func),
      filterchildren(values(node.childNodes))
    ) : null;
  return func(node, children);
});

const parseElement = (node, inject) => {
  // if (!inject) return node.tagName;
  //if (nodeName == 'product') console.log(node);
  const transformFunction = nodeMatches(node);
  return transformFunction(node, inject);
};

const rs = walkDOM(parseElement, product);

console.log(rs);
//copy and paste rs and put it in to a .html file
