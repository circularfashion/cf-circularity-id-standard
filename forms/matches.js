/* eslint-disable no-unused-vars */
// matches.js

const { matches } = require('z');
const definitions = require('./definitions.js');

const nodeMatches = (node) =>
  matches(node)(
    (x = {
      tagName: 'define',
    }) => definitions.define,
    //
    (x = {
      attributes: {
        0: {
          name: 'name',
          value: 'product',
        },
      },
    }) => definitions.product,
    //
    (x = {
      tagName: 'element',
      attributes: {
        0: {
          name: 'name',
        },
      },
    }) => definitions.namedElement,
    //
    (x = {
      tagName: 'element',
    }) => definitions.element,
    //
    (x = {
      tagName: 'oneOrMore',
    }) => definitions.oneOrMore,
    //
    (x = {
      tagName: 'optional',
    }) => definitions.optional,
    //
    (x = {
      tagName: 'text',
    }) => definitions.text,
    //
    (x = {
      tagName: 'ref',
    }) => definitions.ref, // todo actually deal with this!!!!!
    //
    (x = {
      tagName: 'data',
      attributes: {
        0: {
          name: 'type',
          value: 'Name',
        },
      },
    }) => definitions.input,
    //
    (x = {
      tagName: 'data',
      attributes: {
        0: {
          name: 'type',
          value: 'token',
        },
      },
    }) => definitions.input,
    //
    (x) => definitions.default,
  );

module.exports = {
  nodeMatches,
};
