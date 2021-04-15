import path from 'path';
import fs from 'fs';
import yaml from 'js-yaml';

const getObj = (filepath) => {
  if (path.extname(filepath) === '.json') {
    try {
      const file = JSON.parse(fs.readFileSync(filepath).toString());
      return file;
    } catch (error) {
      if (error.code === 'ENOENT') {
        throw new Error('File not found!');
      }
      throw error;
    }
  }

  if (path.extname(filepath) === '.yaml' || path.extname(filepath) === '.yml') {
    try {
      const doc = yaml.load(fs.readFileSync(filepath, 'utf8'));
      return doc;
    } catch (error) {
      if (error.code === 'ENOENT') {
        throw new Error('File not found!');
      }
      throw error;
    }
  }

  return new Error('unknown file extension');
};

export default getObj;
