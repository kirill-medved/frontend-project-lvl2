import findDiff from './../src/findDiff';
import getJsObj from './../src/parsers/extnameParser';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) =>
  path.join(__dirname, '..', '__fixtures__', filename);

describe('parser', () => {
  it('success convert yaml to js', () => {
    const path1 = getFixturePath('file1.yaml');
    const path2 = getFixturePath('file2.yaml');
    expect(getJsObj(path1, path2)).toEqual([
      { age: 26, email: 'fghj@mail.ru', married: false, name: 'kirill' },
      { age: 34, email: 'fghj@mail.ru', married: true, name: 'kirill' },
    ]);
  });
  //   it('throw error for uncurrect path', () => {
  //     const path1 = getFixturePath('wrPath.yaml');
  //     const path2 = getFixturePath('file2.yaml');
  //     expect(getJsObj(path1, path2)).toThrow();
  //   });
});
