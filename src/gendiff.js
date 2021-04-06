#!/usr/bin/env node

import program from 'commander';
import findDiff from './findDiff.js'; // without .js return Error [ERR_MODULE_NOT_FOUND]

program
  .description('Compares two configuration files and shows a difference')
  .arguments('<filepath1> <filepath2>')
  .version('0.0.1', '-V, --version', 'output the version number')
  .option('-f, --format [type]', 'output format type [stylish]', 'stylish')
  .action((path1, path2, { format }) => {
    const result = findDiff(path1, path2, format);

    switch (format) {
      case 'stylish':
        console.log(
          JSON.stringify(result, null, 2).replace(/"/gi, '').replace(/,/gi, ''),
        );
        return JSON.stringify(result, null, 2)
          .replace(/"/gi, '')
          .replace(/,/gi, '');

      case 'plain':
        console.log(result);
        return result;

      case 'json':
        console.log(JSON.stringify(result, null, 2));
        return JSON.stringify(result, null, 2);

      default:
        console.log(result);
        break;
    }

    return result;
  });

program.parse();
