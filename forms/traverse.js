const _ = require('lodash/fp');
const { matches } = require('z');
// https://github.com/z-pattern-matching/z

const {
  get,
  keys,
} = _;

const objectId = 'ATTR.name';

const traverse = (object, objectKey) => {
  id = get(objectId, object);
  ks = keys(object);
};

export default traverse;
