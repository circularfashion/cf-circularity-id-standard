




const fs = require('fs');
const _ = require('lodash/fp');
const {DOMParser} = require('xmldom');

const {
  values,
  keys,
  each,
  curry,
  map,
  isObject,
  filter,
  has,
} = _;

const {nodeMatches} = require('./matches.js');

const f = fs.readFileSync('../schema/0.02/schema.rng', 'utf8');
const parser = new DOMParser();
const document = parser.parseFromString(f, 'text/xml');
const define = document.getElementsByTagName('define');
const product = define[0];

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

// following line generated with
// xml2js.parseString(f, (e, r) => (d = r))
// loaded to memory for now

// const bigData = require('./relaxJsObj.json').grammar;
// const xml2js = require('xml2js');
// const xmljs = require('xml-js');
// const fs = require('fs');
// const _ = require('lodash/fp');
//
// const f = fs.readFileSync('../schema/0.02/schema.rng', "utf8");
//
//
// const {
//   map,
//   reduce,
//   isArray,
//   isObject,
//   mapValues,
//   mapKeys,
//   merge,
//   omit,
//   get,
//   uniq,
// } = _;
//
// const mapValues2 = mapValues.convert({cap: false});
// const mapKeys2 = mapKeys.convert({cap: false});
// const map2 = map.convert({cap: false});
//
// const rest = bigData => {
//   bigData = xmljs.xml2js(f, {compact: true, spaces: 4});
//   console.log(bigData);
//   fs.writeFileSync('./relaxJsObj.json', JSON.stringify(bigData, null, 2));
//   const traverseObject = (func, obj, kk, oo) => {
//     if (isArray(obj)) {
//       return map2((v, k) => {
//         func(obj, kk, oo);
//         return traverseObject(func, v, k, obj);
//       }, obj);
//     } else if (isObject(obj)) {
//       return mapValues2((v, k, o) => {
//         func(obj, kk, oo);
//         return traverseObject(func, v, k, o);
//       }, obj);
//     } else {
//       return func(obj, kk, oo);
//     }
//   };
//
//   console.log('hello');
//   const elements = [];
//
//   const val = (v, k, o) => {
//     const y = get('ATTR.name', v);
//     console.log('--');
//     if (y && y === 'material') {
//       elements.push(v);
//       console.log(y);
//       console.log(k);
//     }
//     return v;
//   };
//
//
//   const l = traverseObject(val, bigData.grammar.define);
//
//
//
//   const p = map(x => omit(['ATTR'], merge(x, {
//     name: get("ATTR.name", x),
//   })), uniq(elements));
//
//   console.log(uniq(p));
//   console.log('---------');
// };
//
// xml2js.parseStringPromise(f, {
//   attrkey: 'ATTR',
//   explicitArray: false,
// }).then(rest);
