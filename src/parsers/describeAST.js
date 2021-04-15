import _ from 'lodash';
import actionAST from '../utils/actionAST.js';

const describeAST = (obj1, obj2) => {
  const prepareData = (obj) => {
    const ast = _(obj)
      .toPairs()
      .sortBy([(o) => o[0]])
      .map(([key, value]) => {
        if (_.isObjectLike(value) && !Array.isArray(value)) {
          return [key, prepareData(value)];
        }
        return [key, value];
      })
      .value();
    return ast;
  };
  const oldAst = prepareData(obj1);
  const newAst = prepareData(obj2);

  const findDiff = (ast1, ast2, path = '') =>
    _([...ast2, ...ast1])
      .sortBy([(o) => o[0]])
      // .sort((a, b) => (a[0] > b[0] ? 1 : -1))
      .groupBy((item) => item[0])
      .map((arr, parent) => {
        if (arr.length === 1) {
          // property include in old or new file
          const key1 = arr[0][0];
          const value1 = arr[0][1];
          if (ast1.some(([key, value]) => value === value1 && key === key1)) {
            return actionAST('removed', { parent, path, value1 });
          }

          if (ast2.some(([key, value]) => value === value1 && key === key1)) {
            return actionAST('added', { parent, path, value1 });
          }

          return 'something missing';
        }
        const value1 = arr[0][1]; // old data
        const value2 = arr[1][1]; // new data

        if (value1 === value2) {
          return actionAST('same', { parent, path, value1 });
        }
        if (Array.isArray(value1) && Array.isArray(value2)) {
          return [parent, findDiff(value1, value2, path.concat(`${parent}.`))];
        }
        if (value1 !== value2) {
          return actionAST('updated', { parent, path, value1, value2 });
        }

        return 'missing something';
      })
      .value();
  const diff = findDiff(oldAst, newAst);
  return diff;
};

export default describeAST;
