import _ from 'lodash';

const stylish = (ast) => {
  // formatting child value from array to obj
  const convertArrToObj = (value) => {
    if (!Array.isArray(value)) return value;

    const checkChild = value.map(([key, val]) => {
      if (Array.isArray(val)) {
        return [key, convertArrToObj(val)];
      }
      return [key, val];
    });

    return Object.fromEntries(checkChild);
  };
  // collecting of converted data
  const formattedAst = ast.reduce((acc, [key, value]) => {
    if (Array.isArray(value)) {
      acc[key] = stylish(value);
      return acc;
    }

    if (_.isPlainObject(value)) {
      if (value.type === 'same') {
        acc[`  ${key}`] = convertArrToObj(value.value);
        return acc;
      }

      if (value.type === 'removed') {
        acc[`- ${key}`] = convertArrToObj(value.value);
        return acc;
      }

      if (value.type === 'added') {
        acc[`+ ${key}`] = convertArrToObj(value.value);
        return acc;
      }

      if (value.type === 'updated') {
        acc[`- ${key}`] = convertArrToObj(value.value1);
        acc[`+ ${key}`] = convertArrToObj(value.value2);
        return acc;
      }
    }
    return acc;
  }, {});
  return formattedAst;
};

export default stylish;
