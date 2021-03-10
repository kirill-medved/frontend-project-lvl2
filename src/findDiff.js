import fs from 'fs';

const findDiff = (filepath1, filepath2) => {
  const file1 = JSON.parse(fs.readFileSync(filepath1).toString()); // get buffer or error from filepath convert to JSON string and parse to obj
  const file2 = JSON.parse(fs.readFileSync(filepath2).toString()); // if get error return error
  const ent1 = Object.entries(file1); // get entries
  const ent2 = Object.entries(file2);

  const difArray = [...ent2, ...ent1]
    .sort((a, b) => (a[0] > b[0] ? 1 : -1)) // entries are sorting by alphabet
    .map(([key, value], index, arr) => {
      if (file1[key] === undefined) {
        // if prop doesn't exist in file1 then this prop added in file2
        return [`+ ${key}`, value];
      }
      if (file2[key] === undefined) {
        // if prop doesn't exist in file2 then this prop added in file1
        return [`- ${key}`, value];
      }
      if (file1[key] !== file2[key] && file1[key] === value) {
        // check that values aren't equal and current value from file1
        return [`- ${key}`, value];
      }
      if (file1[key] !== file2[key] && file2[key] === value) {
        // check that values aren't equal and current value from file2
        return [`+ ${key}`, value];
      }
      return [key, value]; // will work when values are equal.
    });

  return Object.fromEntries(difArray); // this method will delete all duplicated properties
};

export default findDiff;
