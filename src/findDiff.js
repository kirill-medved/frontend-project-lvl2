import getJsObj from './parsers/extnameParser.js';
import selectFormat from './formatters/index.js';
import createAST from './parsers/createAST.js';

const findDiff = (path1, path2, format = 'stylish') => {
  let obj1 = null;
  let obj2 = null;
  try {
    [obj1, obj2] = getJsObj(path1, path2);
  } catch (error) {
    return error.message;
  }
  const ast = createAST(obj1, obj2);
  const difObj = selectFormat(ast, format);
  return difObj;
};

export default findDiff;
