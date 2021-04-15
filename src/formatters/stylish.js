import _ from 'lodash';

const STANDART_INDENTS = 4;

const countIndents = (depth) => ' '.repeat(STANDART_INDENTS * depth);

// formatting child value from array to obj
const formatChild = (value, depth) => {
  if (!Array.isArray(value)) return `${value}\n`;

  const checkChild = value.reduce((acc, [key, val]) => {
    if (Array.isArray(val)) {
      return acc.concat(
        `${countIndents(depth + 1)}${key}: ${formatChild(val, depth + 1)}`,
      );
    }
    return acc.concat(`${countIndents(depth + 1)}${key}: ${val}\n`);
  }, '');

  return `{\n${checkChild}${countIndents(depth)}}\n`;
};

const stylish = (ast, depth = 0) => {
  // collecting of converted data
  const formattedAst = ast.reduce((acc, [key, value]) => {
    if (Array.isArray(value)) {
      return acc.concat(
        `${countIndents(depth + 1)}${key}: ${stylish(value, depth + 1)}`,
      );
    }

    if (_.isPlainObject(value)) {
      if (value.type === 'same') {
        return acc.concat(
          `${countIndents(depth + 1)}${key}: ${formatChild(
            value.value,
            depth + 1,
          )}`,
        );
      }

      if (value.type === 'removed') {
        return acc.concat(
          `${countIndents(depth)}  - ${key}: ${formatChild(
            value.value,
            depth + 1,
          )}`,
        );
      }

      if (value.type === 'added') {
        return acc.concat(
          `${countIndents(depth)}  + ${key}: ${formatChild(
            value.value,
            depth + 1,
          )}`,
        );
      }

      if (value.type === 'updated') {
        return acc.concat(
          `${countIndents(depth)}  - ${key}: ${formatChild(
            value.value1,
            depth + 1,
          )}`,
          `${countIndents(depth)}  + ${key}: ${formatChild(
            value.value2,
            depth + 1,
          )}`,
        );
      }
    }
    return acc;
  }, '');

  return `{\n${formattedAst}${countIndents(depth)}}\n`;
};

export default stylish;
