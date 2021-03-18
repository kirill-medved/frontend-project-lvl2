import findDiff from './../src/findDiff';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) =>
  path.join(__dirname, '..', '__fixtures__', filename);

describe('test findDiff func', () => {
  it('with correct path', () => {
    const path1 = getFixturePath('file1.json');
    const path2 = getFixturePath('file2.json');
    expect(findDiff(path1, path2)).toEqual({
      '+ name': 'Ivan',
      '+ timeout': 20,
      '+ verbose': true,
      '- follow': false,
      '- proxy': '123.234.53.22',
      '- timeout': 50,
      '- verbose': false,
      host: 'hexlet.io',
    });
  });

  // it('without correct path to file1', () => {
  //   const wrPath = getFixturePath('wrong.json');
  //   const path2 = getFixturePath('file2.json');
  //   expect(findDiff('./fdf/1.json', 'fdsf2/fds/2.json')).toThrow();
  // });
});
