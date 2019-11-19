const {
  walkDOMUp,
  walkDOMDown,
} = require('./walkers.js');

const {nodeMatches} = require('./matches.js');
const {pathMatches} = require('./match_path.js');


const transformRngToDot = (node, parents) => {
  const repr = pathMatches(node);
  return repr ? `${parents}.${repr}` : parents;
};

const transformRngToNode = (node, inject) => {
  const transformFunction = nodeMatches(node);
  console.log(walkDOMUp(parseDotPath, node));
  return transformFunction(node, inject);
};

const parseRng = walkDOMDown(transformRngToNode);
const parseDotPath = walkDOMUp(transformRngToDot);

module.exports = {
  parseDotPath,
  parseRng,
};
