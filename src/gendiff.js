#!/usr/bin/env node
// this file for add command to package
const { program } = require('commander');

program
  .description('Compares two configuration files and shows a difference')
  .version('0.0.1', '-V, --version', 'output the version number');

program.parse();
