import path from 'path';
import fs from 'fs';
import yaml from 'js-yaml';

const getJsObj = (path1, path2) => {
  try {
    if (path.extname(path1) === '.json' && path.extname(path2) === '.json') {
      const file1 = JSON.parse(fs.readFileSync(path1).toString());
      const file2 = JSON.parse(fs.readFileSync(path2).toString());
      return [file1, file2];
    }
    if (path.extname(path1) === '.yaml' && path.extname(path2) === '.yaml') {
      const doc1 = yaml.load(fs.readFileSync(path1, 'utf8'));
      const doc2 = yaml.load(fs.readFileSync(path2, 'utf8'));
      return [doc1, doc2];
    }

    return new Error('unknown file extension');
  } catch (e) {
    throw new Error(e);
  }
};

export default getJsObj;
