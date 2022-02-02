import _ from 'lodash';
import parser from './parsers.js';

const fileParse = (file) => parser(file);

const operators = ['+', '-'];

// const genDiff = (file1, file2) => {
//   const fileJson1 = fileParse(file1);
//   const fileJson2 = fileParse(file2);
//   let result = {};

//   const keys1 = Object.keys(fileJson1);
//   const keys2 = Object.keys(fileJson2);
//   const keysAll = [...keys1, ...keys2];
//   keysAll.sort();
//   console.log(keysAll);

//   keysAll.map((key) => {
//     const keyInFirst = fileJson1[key];
//     const keyInSecond = fileJson2[key];

//     if (key in fileJson1 && key in fileJson2 && keyInFirst === keyInSecond) {
//       result[`  ${key}`] = keyInFirst;
//     } else if (key in fileJson1 && key in fileJson2 && keyInFirst !== keyInSecond) {
//       result[`${operators[1]} ${key}`] = keyInFirst;
//       result[`${operators[0]} ${key}`] = keyInSecond;
//     } else if (!(key in fileJson1) || key in fileJson2) {
//       result[`${operators[0]} ${key}`] = keyInSecond;
//     } else if (key in fileJson1 || !(key in fileJson2)) {
//       result[`${operators[1]} ${key}`] = keyInFirst;
//     }
//   });

//   result = JSON.stringify(result, null, 2);
//   result.replace(/"/g, '').replace(/,/g, '');

//   return result;
// };

const genDiff = (file1, file2) => {
  const fileData1 = fileParse(file1);
  const fileData2 = fileParse(file2);
  let result = {};

  const keys1 = Object.keys(fileData1);
  const keys2 = Object.keys(fileData2);
  const sortedKeys = _.union(keys1, keys2);
  sortedKeys.sort();

  sortedKeys.forEach((key) => {
    const keyInFirst = fileData1[key];
    const keyInSecond = fileData2[key];

    if (_.isPlainObject(keyInFirst) && _.isPlainObject(keyInSecond)) {
      result[`  ${key}`] = genDiff(keyInFirst, keyInSecond);
    } else if ((key in fileData1 && key in fileData2) && (keyInFirst === keyInSecond)) {
      result[`  ${key}`] = keyInFirst;
    } else if ((key in fileData1 && key in fileData2) && (keyInFirst !== keyInSecond)) {
      result[`${operators[1]} ${key}`] = keyInFirst;
      result[`${operators[0]} ${key}`] = keyInSecond;
    } else if (!(key in fileData1) || (key in fileData2)) {
      result[`${operators[0]} ${key}`] = keyInSecond;
    } else if (key in fileData1 || !(key in fileData2)) {
      result[`${operators[1]} ${key}`] = keyInFirst;
    }
    return result;
  });

  result = JSON.stringify(result, null, 2);
  return result.replace(/"/g, '').replace(/,/g, '');
};

export default genDiff;
