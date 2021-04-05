import _ from 'lodash';

const plain = (ast) => {
  const formattedAst = ast.reduce((acc, [, value]) => {
    if (Array.isArray(value)) {
      return acc.concat(plain(value));
    }

    if (_.isPlainObject(value) && value.type !== 'same') {
      return acc.concat(value.message, '\n');
    }

    return acc;
  }, '');

  return formattedAst;
};

export default plain;
