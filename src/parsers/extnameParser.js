import path from 'path';
import fs from 'fs';
import yaml from 'js-yaml';

const getObj = (filepath) => {
  if (path.extname(filepath) === '.json') {
    let file = null;
    try {
      file = JSON.parse(fs.readFileSync(filepath).toString());
    } catch (error) {
      if (error.code === 'ENOENT') {
        throw new Error('File not found!');
      }
      throw error;
    }

    return file;
  }

  if (path.extname(filepath) === '.yaml' || path.extname(filepath) === '.yml') {
    let doc = null;
    try {
      doc = yaml.load(fs.readFileSync(filepath, 'utf8'));
    } catch (error) {
      if (error.code === 'ENOENT') {
        throw new Error('File not found!');
      }
      throw error;
    }

    return doc;
  }

  return new Error('unknown file extension');
};

export default getObj;
