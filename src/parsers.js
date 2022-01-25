// import fs from 'fs';
import yaml from 'js-yaml';
import path from 'path';
import { readFileSync } from 'fs';

const parser = (file) => {
  const format = path.extname(file);
  const data = readFileSync(path.resolve(file), 'utf8');
  if (format === '.yml' || format === '.yaml') {
    return yaml.load(data);
  }
  return JSON.parse(data);
};

export default parser;
