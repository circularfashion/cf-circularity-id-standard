/* eslint-disable no-unused-vars */
// matches.js

const { matches } = require('z');
const {
  get,
} = require('lodash/fp');

const {
  definition,
  namedElement,
} = require('./definitions.js');


// destructure the domparser data structure FROM html form TO valid xml
// as described by schema
const pathMatches = (node) =>
  matches(node).call(
    {definition, namedElement},
    (x = definition) => '',
    (x = namedElement) => get('attributes.0.value', x),
    (x) => ''
  );

module.exports = {
  pathMatches,
};
