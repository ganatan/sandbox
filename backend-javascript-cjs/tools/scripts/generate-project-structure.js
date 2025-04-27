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

function generateStructureForFolders(folders) {
  let fullStructure = '';
  for (const folder of folders) {
    const folderPath = path.join(__dirname, '..', '..', folder);
    if (fs.existsSync(folderPath)) {
      fullStructure += `\nStructure of ${folder}:\n`;
      fullStructure += getDirectoryStructure(folderPath);
    } else {
      fullStructure += `\n${folder} directory does not exist.\n`;
    }
  }

  return fullStructure;
}

function generateStructureForRoot() {
  const rootPath = path.join(__dirname, '..', '..');
  let structure = '\nStructure of project root:\n';
  structure += getDirectoryStructure(rootPath, 0);

  return structure;
}

const foldersToInspect = ['src', '__tests__', 'tools'];
const projectStructure = generateStructureForFolders(foldersToInspect);
const rootStructure = generateStructureForRoot();

console.log(rootStructure + projectStructure);

module.exports = {
  getDirectoryStructure,
  generateStructureForFolders,
  generateStructureForRoot,
};
