'use strict';

const fs = require('fs');
const path = require('path');

const excludedDirs = ['coverage', 'dist', 'logs', 'node_modules'];

function getDirectoryStructure(dirPath, level = 0) {
  const files = fs.readdirSync(dirPath);
  let structure = '';

  for (const file of files) {
    if (excludedDirs.includes(file)) {
      continue;
    }
    const fullPath = path.join(dirPath, file);
    const isDirectory = fs.lstatSync(fullPath).isDirectory();
    structure += `${'  '.repeat(level)}|-- ${file}\n`;
    if (isDirectory) {
      structure += getDirectoryStructure(fullPath, level + 1);
    }
  }

  return structure;
}

function generateProjectStructure() {
  const rootPath = path.join(__dirname, '..', '..');
  let structure = 'Structure of project root:\n';
  structure += getDirectoryStructure(rootPath);

  return structure;
}

const projectStructure = generateProjectStructure();

console.log(projectStructure);

module.exports = {
  getDirectoryStructure,
  generateProjectStructure,
};
