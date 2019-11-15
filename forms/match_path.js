/* eslint-disable no-unused-vars */
// matches.js

const { matches } = require('z');
const definitions = require('./definitions.js');

const {
  get
} = require('lodash/fp');

const pathMatches = (node) =>
  matches(node)(
    (x = {
      tagName: 'define',
    }) => '',
    //
    (x = {
      attributes: {
        0: {
          name: 'name',
          value: 'product',
        },
      },
    }) => get('attributes.0.value', x),
    //
    (x = {
      tagName: 'element',
      attributes: {
        0: {
          name: 'name',
        },
      },
    }) => get('attributes.0.value', x),
    //
    (x = {
      tagName: 'element',
    }) => 'jjjjjj',
    //
    (x = {
      tagName: 'oneOrMore',
    }) => 'aaaaaaaa',
    //
    (x = {
      tagName: 'zeroOrMore',
    }) => '',
    //
    (x = {
      tagName: 'optional',
    }) => '',
    //
    (x = {
      tagName: 'text',
    }) => '',
    //
    (x = {
      tagName: 'ref',
    }) => '', // todo actually deal with this!!!!!
    //
    (x = {
      tagName: 'list',
    }) => '', // todo actually deal with this!!!!!
    //
    (x = {
      tagName: 'choice',
    }) => '', // todo actually deal with this!!!!!
    //
    (x = {
      tagName: 'value',
    }) => '', // todo actually deal with this!!!!!
    //
    (x = {
      tagName: 'data',
      attributes: {
        0: {
          name: 'type',
          value: 'Name',
        },
      },
    }) => '',
    //
    (x = {
      tagName: 'data',
      attributes: {
        0: {
          name: 'type',
          value: 'decimal',
        },
      },
    }) => '',
    //
    (x = {
      tagName: 'data',
      attributes: {
        0: {
          name: 'type',
          value: 'int',
        },
      },
    }) => '',
    //
    (x = {
      tagName: 'data',
      attributes: {
        0: {
          name: 'type',
          value: 'token',
        },
      },
    }) => '',
    //
    (x = {
      tagName: 'attribute',
    }) => '',
    //
    (x) => '',
  );

module.exports = {
  pathMatches,
};
