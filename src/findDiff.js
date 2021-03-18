import fs from 'fs';

const findDiff = (filepath1, filepath2) => {
  let file1 = null;
  let file2 = null;
  try {
    file1 = JSON.parse(fs.readFileSync(filepath1).toString()); // convert file data to obj
    file2 = JSON.parse(fs.readFileSync(filepath2).toString());
  } catch (e) {
    throw e;
  }

  const ent1 = Object.entries(file1);
  const ent2 = Object.entries(file2);

  const difArray = [...ent2, ...ent1]
    .sort((a, b) => (a[0] > b[0] ? 1 : -1)) // entries are sorting by alphabet
    .map(([key, value]) => {
      // check that key is exist
      if (file1[key] === undefined) {
        return [`+ ${key}`, value];
      }
      if (file2[key] === undefined) {
        return [`- ${key}`, value];
      }
      if (file1[key] !== file2[key] && file1[key] === value) {
        return [`- ${key}`, value];
      }
      if (file1[key] !== file2[key] && file2[key] === value) {
        return [`+ ${key}`, value];
      }
      return [key, value]; // will work when values are equal.
    });

  return Object.fromEntries(difArray);
};

export default findDiff;
