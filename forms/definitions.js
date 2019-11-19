

const definitions = {
  definition: {
    tagName: 'define',
  },
  namedElement: {
    tagName: 'element',
    attributes: {
      0: {
        name: 'name',
      },
    },
  },
  element: {
    tagName: 'element',
  },
  oneOrMore: {
    tagName: 'oneOrMore',
  },
  zeroOrMore: {
    tagName: 'zeroOrMore',
  },
  optional: {
    tagName: 'optional',
  },
  text: {
    tagName: 'text',
  },
  ref: {
    tagName: 'ref',
  },
  list: {
    tagName: 'list',
  },
  choice: {
    tagName: 'choice',
  },
  value: {
    tagName: 'value',
  },
  input: {
    tagName: 'data',
    attributes: {
      0: {
        name: 'type',
        value: 'Name',
      },
    },
  },
  decimal: {
    tagName: 'data',
    attributes: {
      0: {
        name: 'type',
        value: 'decimal',
      },
    },
  },
  int: {
    tagName: 'data',
    attributes: {
      0: {
        name: 'type',
        value: 'int',
      },
    },
  },
  token: {
    tagName: 'data',
    attributes: {
      0: {
        name: 'type',
        value: 'token',
      },
    },
  },
  attribute: {
    tagName: 'attribute',
  },
  default: {},
};

module.exports = definitions;
