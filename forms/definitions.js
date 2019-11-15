
module.exports = {
  define: (node, inject) => {
    return inject;
  },
  product: (node, inject) => {
    return `<h1>omg we have a product</h1><product>${inject}</product>`;
  },
};
