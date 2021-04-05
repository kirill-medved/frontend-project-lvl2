import json from './json.js';
import plain from './plain.js';
import stylish from './stylish.js';

const selectFormat = (ast, format) => {
  switch (format) {
    case 'plain':
      return plain(ast);

    case 'stylish':
      return stylish(ast);

    case 'json':
      return json(ast);
    default:
      return new Error("This format doesn't exist");
  }
};

export default selectFormat;
