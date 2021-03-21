import getJsObj from './parsers/extnameParser.js';
import esprima from 'esprima';
import getSyntaxTrees from './parsers/esprimaParser.js';

const getObjects = (path1, path2) => {
  let obj1 = null;
  let obj2 = null;
  try {
    [obj1, obj2] = getJsObj(path1, path2);
  } catch (e) {
    throw e;
  }
  return [obj1, obj2];
};

const stylishFormatter = (ast1 = [], ast2 = []) => {
  const stylishObj = {};
  const ent = [...ast2, ...ast1].sort((a, b) =>
    a['key']['value'] > b['key']['value'] ? 1 : -1,
  );

  ent.map(
    ({
      key: { value: Kvalue },
      value: { type: Vtype, value: Vvalue = null, properties: Vprops = null },
    }) => {
      const ast1Item = ast1.filter(
        ({ key: { value: ast1Kvalue } }) => ast1Kvalue === Kvalue,
      )[0];
      const ast2Item = ast2.filter(
        ({ key: { value: ast2Kvalue } }) => ast2Kvalue === Kvalue,
      )[0];

      if (ast1Item === undefined) {
        stylishObj[`+ ${ast2Item['key']['value']}`] = ast2Item['value'][
          'properties'
        ]
          ? stylishFormatter(
              ast2Item['value']['properties'],
              ast2Item['value']['properties'],
            )
          : ast2Item['value']['value'];
        return;
      }
      if (ast2Item === undefined) {
        stylishObj[`- ${ast1Item['key']['value']}`] = ast1Item['value'][
          'properties'
        ]
          ? stylishFormatter(
              ast1Item['value']['properties'],
              ast1Item['value']['properties'],
            )
          : ast1Item['value']['value'];
        return;
      }

      const {
        key: { value: ast1Kvalue },
        value: {
          type: ast1Vtype,
          value: ast1Vvalue = undefined,
          properties: ast1Vprops = undefined,
        },
      } = ast1Item;

      const {
        key: { value: ast2Kvalue },
        value: {
          type: ast2Vtype,
          value: ast2Vvalue = undefined,
          properties: ast2Vprops = undefined,
        },
      } = ast2Item;

      if (ast1Vtype !== ast2Vtype) {
        stylishObj[`- ${ast1Kvalue}`] = ast1Vprops
          ? stylishFormatter(ast1Vprops, ast1Vprops)
          : ast1Vvalue;
        stylishObj[`+ ${ast2Kvalue}`] = ast2Vprops
          ? stylishFormatter(ast2Vprops, ast2Vprops)
          : ast2Vvalue;
        return;
      }
      if (ast1Vtype === ast2Vtype && ast1Vtype === 'ObjectExpression') {
        stylishObj[`${ast1Kvalue}`] = stylishFormatter(ast1Vprops, ast2Vprops);
        return;
      }
      if (ast1Vvalue !== ast2Vvalue) {
        stylishObj[`- ${ast1Kvalue}`] = ast1Vvalue;
        stylishObj[`+ ${ast2Kvalue}`] = ast2Vvalue;
        return;
      }
      if (ast1Vvalue === ast2Vvalue) {
        stylishObj[`${ast1Kvalue}`] = ast1Vvalue;
        return;
      }
    },
  );

  return stylishObj;
};

const findDiff = (path1, path2) => {
  const [obj1, obj2] = getObjects(path1, path2);
  const [ast1, ast2] = getSyntaxTrees(obj1, obj2);
  const difObj = stylishFormatter(ast1, ast2);
  return difObj;
};

export default findDiff;
