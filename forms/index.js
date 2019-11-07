// following line generated with
// xml2js.parseString(f, (e, r) => (d = r))
// loaded to memory for now
const bigData = require('./relaxJsObj.json').grammar;
const _ = require('lodash/fp');

const {
  map,
  reduce,
  isArray,
  isObject,
  mapValues,
  merge,
  omit,
  get,
} = _;

const mapValues2 = mapValues.convert({cap: false})
const map2 = map.convert({cap: false})

const traverseObject = (func, obj, kk, oo) => {
  if (isArray(obj)) {
    return map2((v, k) => {
      func(obj, kk, oo);
      return traverseObject(func, v, k, obj)
    }, obj);
  } else if (isObject(obj)) {
    return mapValues2((v, k, o) => {
      func(obj, kk, oo);
      return traverseObject(func, v, k, o)
    }, obj);
  } else {
    return func(obj, kk, oo);
  }
};

console.log('hello');
const elements = []

const val = (v, k, o) => {
  // console.log(v)
  // console.log(k)
  // console.log(o);
  if (k === '$') {
    const a = get('name', v);
    if (a === 'material') {
      console.log(v)
      console.log(k)
      console.log(o);
      console.log('-----');
    }
    elements.push(o);
  }
  return v;
}

const l = traverseObject(val, bigData.define)

const p = map(x => omit(['$'], merge(x, {
  name: get("name", x['$']),
})), elements);

console.log(p)

module.exports = p
