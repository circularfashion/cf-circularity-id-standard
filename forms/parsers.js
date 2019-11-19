const {
  walkDOMUp,
} = require('./walkers.js');

const {nodeMatches} = require('./matches.js');
const {pathMatches} = require('./match_path.js');


const parseDotPath = (node, parents) => {
  const repr = pathMatches(node);
  return repr ? `${parents}.${repr}` : parents;
};

const parseRng = (node, inject) => {
  const transformFunction = nodeMatches(node);
  console.log(walkDOMUp(parseDotPath, node));
  return transformFunction(node, inject);
};

module.exports = {
  parseDotPath,
  parseRng,
};
