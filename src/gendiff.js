#!/usr/bin/env node

import program from 'commander';
import findDiff from './findDiff.js';

program
  .description('Compares two configuration files and shows a difference')
  .arguments('<filepath1> <filepath2>')
  .version('0.0.1', '-V, --version', 'output the version number')
  .option('-f, --format [type]', 'output format')
  .action((f1, f2) => {
    const result = findDiff(f1, f2);
    console.log(result);
  });

program.parse();
