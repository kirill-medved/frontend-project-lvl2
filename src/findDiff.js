import getObj from './parsers/extnameParser.js';
import selectFormat from './formatters/index.js';
import describeAST from './parsers/describeAST.js';

const findDiff = (path1, path2, format = 'stylish') => {
  let obj1 = null;
  let obj2 = null;
  try {
    obj1 = getObj(path1);
    obj2 = getObj(path2);
  } catch (error) {
    return error.message;
  }
  const ast = describeAST(obj1, obj2);
  const difObj = selectFormat(ast, format);

  switch (format) {
    case 'stylish':
      return difObj.trim();

    case 'plain':
      return difObj.trim();

    case 'json':
      return JSON.stringify(difObj, null, 4);

    default:
      return difObj;
  }
};

export default findDiff;
