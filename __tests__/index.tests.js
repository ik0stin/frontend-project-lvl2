import fs from 'fs';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import genDiff from '../src/genDiff.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

describe('check for correct diff', () => {
  it('compare files json', () => {
    expect(genDiff('file1.json', 'file2.json')).toEqual(readFile('expected_file.txt'));
  });
  it('compare deep files json', () => {
    expect(genDiff('file11.json', 'file22.json')).toEqual(readFile('expected_file_2.txt'));
  });
  it('compare files yml', () => {
    expect(genDiff('file1.yml', 'file2.yml')).toEqual(readFile('expected_file.txt'));
  });
  it('compare deep files yml', () => {
    expect(genDiff('file11.yml', 'file22.yml')).toEqual(readFile('expected_file_2.txt'));
  });
});
