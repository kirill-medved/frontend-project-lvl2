#!/usr/bin/env node

import program from 'commander';
import findDiff from './findDiff.js'; // without .js return Error [ERR_MODULE_NOT_FOUND]

program
  .description('Compares two configuration files and shows a difference')
  .arguments('<filepath1> <filepath2>')
  .version('0.0.1', '-V, --version', 'output the version number')
  .option('-f, --format [type]', 'output format')
  .action((f1, f2) => {
    const result = JSON.stringify(findDiff(f1, f2), null, 2);
    const regex = /"/gi;
    console.log(result.replace(regex, ''));
  });

program.parse();
