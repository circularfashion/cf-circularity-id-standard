/* eslint-disable no-unused-vars */
// matches.js

const { matches } = require('z');
const definitions = require('./definitions.js');

const nodeMatches = (node, inject) =>
  matches(node)(
    (x = {
      tagName: 'define',
    }) => definitions.define(node, inject),
    (x = {
      attributes: {
        0: {
          name: 'name',
          value: 'product',
        },
      },
    }) => definitions.product(node, inject),
    (x) => [node.tagName, inject]
  );

module.exports = {
  nodeMatches,
};
