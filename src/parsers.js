import fs from 'fs';
import yaml from 'js-yaml';
import path from 'path';

// let parse;
// if (format === '') {
//   parse = JSON.parse;
// } else if (format === '.yml' || format === '.yaml') {
//   parse = yaml.load;
// }

// parse(data);

const parser = (file) => {
  const format = path.extname(file);
  const data = fs.readSync(file);
  if (format === '') {
    return JSON.parse(data);
  }
  if (format === '.yml' || format === '.yaml') {
    return yaml.safeLoad(data);
  }
};

export default parser;
