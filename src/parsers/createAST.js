import _ from 'lodash';
import astAPI from '../api/createAstAPI.js';

const createAST = (obj1, obj2) => {
  const astForObj = (obj) => {
    const ast = _(obj)
      .toPairs()
      .sort((a, b) => (a > b ? 1 : -1))
      .map(([key, value]) => {
        if (_.isObjectLike(value) && !Array.isArray(value)) {
          return [key, astForObj(value)];
        }
        return [key, value];
      })
      .value();
    return ast;
  };
  const oldAst = astForObj(obj1);
  const newAst = astForObj(obj2);

  const findDiff = (ast1, ast2, path = '') =>
    _([...ast2, ...ast1])
      .sort((a, b) => (a[0] > b[0] ? 1 : -1))
      .groupBy((item) => item[0])
      .map((arr, parent) => {
        console.log(JSON.stringify(arr, null, 2));
        if (arr.length === 1) {
          const value1 = arr[0][1];

          if (ast1.some(([, value]) => value === value1)) {
            return astAPI('removed', { parent, path, value1 });
          }

          if (ast2.some(([, value]) => value === value1)) {
            return astAPI('added', { parent, path, value1 });
          }
          return 'Ooopss!';
        }
        const value1 = arr[0][1];
        const value2 = arr[1][1];

        if (value1 === value2) {
          return astAPI('same', { parent, path, value1 });
        }
        if (Array.isArray(value1) && Array.isArray(value2)) {
          return [parent, findDiff(value1, value2, path.concat(`${parent}.`))];
        }
        if (value1 !== value2) {
          return astAPI('updated', { parent, path, value1, value2 });
        }

        return 'missing something';
      })
      .value();
  const diff = findDiff(oldAst, newAst);
  return diff;
};

export default createAST;
