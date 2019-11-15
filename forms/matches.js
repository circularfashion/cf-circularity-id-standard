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
      tagName: 'zeroOrMore',
    }) => definitions.zeroOrMore,
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
      tagName: 'list',
    }) => definitions.list, // todo actually deal with this!!!!!
    //
    (x = {
      tagName: 'choice',
    }) => definitions.choice, // todo actually deal with this!!!!!
    //
    (x = {
      tagName: 'value',
    }) => definitions.value, // todo actually deal with this!!!!!
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
          value: 'decimal',
        },
      },
    }) => definitions.decimal,
    //
    (x = {
      tagName: 'data',
      attributes: {
        0: {
          name: 'type',
          value: 'int',
        },
      },
    }) => definitions.int,
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
    (x = {
      tagName: 'attribute',
    }) => definitions.attribute,
    //
    (x) => definitions.default,
  );

module.exports = {
  nodeMatches,
};
