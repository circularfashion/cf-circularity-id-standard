
const {
  values,
  curry,
  map,
  filter,
  has,
} = require('lodash/fp');


const walkDOMUp = (transformFunc, node) => {
  if (!node) return '';
  if (!node.parentNode) return '';
  const p = walkDOMUp(transformFunc, node.parentNode);
  return transformFunc(node, p);
};

const walkDOMDown = curry((transformFunc, node) => {
  const filterchildren = filter(has('tagName'));
  const children = node.hasChildNodes ?
        map(
          walkDOMDown(transformFunc),
          filterchildren(values(node.childNodes))
        ) : null;
  return transformFunc(node, children);
});

module.exports = {
  walkDOMUp,
  walkDOMDown,
};
