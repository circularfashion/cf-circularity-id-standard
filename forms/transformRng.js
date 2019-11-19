/* eslint-disable no-unused-vars */
const {
  get,
  find,
  values,
} = require('lodash/fp');

const {matches} = require('z');
const definitions = require('./definitions.js');

const nodeName = get('attributes.0.value');
const optional = node => matches(node).call(
  {definitions},
  (x = definitions.optional) => true,
  (x) => false
);

const funks = {
  define: (node, inject) =>
    inject.join('<br />')
  ,
  product: (node, inject) =>
    `<h1>omg we have a product</h1><product>${inject.join('<br />')}</product>`
  ,
  element: (node, inject) =>
    `<element>${inject.join('<br />')}</element>`
  ,
  oneOrMore: (node, inject) =>
    `<oneOrMore>${inject.join('<br />')}</oneOrMore>` // functionality for this
  ,
  zeroOrMore: (node, inject) =>
    `<zeroOrMore>${inject.join('<br />')}</zeroOrMore>` // functionality for this
  ,
  optional: (node, inject) =>
    `<optional>${inject.join('<br />')}</optional>`
  ,
  text: (node, inject) =>
    `<textarea>${inject.join('<br />')}</textarea>`
  ,
  ref: (node, inject) => {
    const refFor = nodeName(node);
    const dom = node.ownerDocument;
    const defs = values(dom.getElementsByTagName('define'));
    const definition = find(x => get('attributes.0.value', x) === refFor, defs);
    if (!definition) return `<h5>REF NOT FOUND FOR ${refFor}</h5>`;
    const {
      parseDotPath,
      parseRng,
    } = require('./parsers.js'); // must be here!!! otherwise circular dependency
    return `<ref> <small>ref</small> <br /> ${parseRng(definition)} </ref>`;
    // return `<h5> I AM A REF for ${nodeName(node)} ${inject.join('<br />')}</h5>`;
  },
  input: (node, inject) => {
    const opt = optional(node.parentNode.parentNode);
    return `${opt ? 'i am optional!!!' : 'required'}<input type='text'>${inject.join('<br />')}</input>`;
  },
  decimal: (node, inject) =>
    `<input name=opacity type=number min=0 max=1 step=0.01>${inject.join('<br />')}</input`
  ,
  int: (node, inject) =>
    `<input type=number>${inject.join('<br />')}</input`
  ,
  list: (node, inject) =>
    `<select>${inject.join('<br />')}</select>`
  ,
  choice: (node, inject) =>
    inject.join('/n')
  ,
  value: (node, inject) => {
    const choiceVal = get('childNodes.0.nodeValue', node);
    return `<option value='${choiceVal}'>${choiceVal}</option>`;
  },
  namedElement: (node, inject) => {
    const elname = get('attributes.0.value', node);
    return `<${elname}>${elname}<br />${inject.join('<br />')}</${elname}>`;
  },
  attribute: (node, inject) => {
    const elname = get('attributes.0.value', node);
    return `<attribute>${elname} - ${inject.join('<br />')}</attribute>`;
  },
  default: (node, inject) => {
    console.log(node);
    console.log(node.tagName);
    console.log('above node element NOT FOUND in definitions!!!!');
    return `<<${inject.join('<br />')}>>`;
  },
};

module.exports = funks;
