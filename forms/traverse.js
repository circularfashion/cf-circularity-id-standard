const _ = require('lodash/fp');
const { matches } = require('z');
// https://github.com/z-pattern-matching/z

const {
  get,
  keys,
  map,
  isArray,
} = _;

const objectId = 'ATTR.name';

const traverse = (object, objectKey) => {
  // objectKey could be optional, element, attr, ref,
  // oneOrMore, zeroOrMore, list.choice.value

  if (isArray(object)) return map(traverse(object));
  // if has key element inject that

  id = get(objectId, object);
  ks = keys(object);
};

export default traverse;
