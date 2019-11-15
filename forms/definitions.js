
const _ = require('lodash/fp');

const {
  get,
} = _;

const funks = {
  define: (node, inject) =>
    inject
  ,
  product: (node, inject) =>
    `<h1>omg we have a product</h1><product>${inject.join('\n')}</product>`
  ,
  element: (node, inject) =>
    `<element>${inject.join('\n')}</element>`
  ,
  oneOrMore: (node, inject) =>
    `<oneOrMore>${inject.join('\n')}</oneOrMore>`
  ,
  optional: (node, inject) =>
    `<optional>${inject.join('\n')}</optional>`
  ,
  text: (node, inject) =>
    `<textarea>${inject.join('\n')}</textarea>`
  ,
  ref: (node, inject) => // todo actually deal with this lol
    `<h1> I AM A REF${inject.join('\n')}</h1>`
  ,
  input: (node, inject) =>
    `<input type='text'>${inject.join('\n')}</input>`
  ,
  namedElement: (node, inject) => {
    const elname = get('attributes.0.value', node);
    return `<${elname}>${inject.join('\n')}</${elname}>`;
  },
  default: (node, inject) => {
    console.log(node);
    console.log(node.tagName);
    return `<<${inject.join('\n')}>>`;
  },
};

module.exports = funks;
