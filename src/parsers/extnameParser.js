import path from 'path';
import fs from 'fs';
import yaml from 'js-yaml';

const getJsObj = (path1, path2) => {
  if (path.extname(path1) === '.json' && path.extname(path2) === '.json') {
    let file1 = null;
    let file2 = null;
    try {
      file1 = JSON.parse(fs.readFileSync(path1).toString());
      file2 = JSON.parse(fs.readFileSync(path2).toString());
    } catch (error) {
      if (error.code === 'ENOENT') {
        throw new Error('File not found!');
      }
      throw error;
    }

    return [file1, file2];
  }

  if (path.extname(path1) === '.yaml' && path.extname(path2) === '.yaml') {
    let doc1 = null;
    let doc2 = null;
    try {
      doc1 = yaml.load(fs.readFileSync(path1, 'utf8'));
      doc2 = yaml.load(fs.readFileSync(path2, 'utf8'));
    } catch (error) {
      if (error.code === 'ENOENT') {
        console.log('File not found!');
        return undefined;
      }
      throw error;
    }

    return [doc1, doc2];
  }

  return new Error('unknown file extension');
};

export default getJsObj;
