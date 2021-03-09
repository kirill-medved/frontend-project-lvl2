import fs from 'fs';

const findDiff = (filepath1, filepath2) => {
  const file1 = JSON.parse(fs.readFileSync(filepath1).toString()); // get buffer from filepath convert to JSON string and parse to obj
  const file2 = JSON.parse(fs.readFileSync(filepath2).toString()); // get buffer from filepath convert to JSON string and parse to obj
  const ent1 = Object.entries(file1);
  const ent2 = Object.entries(file2);

  const objectfff = [...ent2, ...ent1]
    .sort((a, b) => (a[0] > b[0] ? 1 : -1)) // entries are sorting by alphabet
    .map(([key, value], index, arr) => {
      if (file1[key] === undefined) {
        return [`+ ${key}`, value];
      }
      if (file2[key] === undefined) {
        return [`- ${key}`, value];
      }
      if (file1[key] !== file2[key] && arr[index][0] === arr[index + 1][0]) {
        return [`- ${key}`, value];
      }
      if (file1[key] !== file2[key] && arr[index][0] !== arr[index + 1][0]) {
        return [`+ ${key}`, value];
      }
      if (file1[key] === file2[key] && arr[index][0] === arr[index + 1][0]) {
        return [`${key}`, value];
      }
      return undefined; // array will be have undefined property for duplicate key with the same value
    })
    .filter((el) => el !== undefined);

  return Object.fromEntries(objectfff);
  // console.log(JSON.stringify(Object.fromEntries(objectfff), null, 2));
};

export default findDiff;
