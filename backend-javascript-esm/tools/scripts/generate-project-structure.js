import fs from 'fs';
import path from 'path';

const excludedDirs = ['coverage', 'dist', 'logs', 'node_modules'];

function getDirectoryStructure(dirPath, level = 0) {
  const files = fs.readdirSync(dirPath);
  let structure = '';

  for (const file of files) {
    if (excludedDirs.includes(file)) {
      continue;
    }
    const fullPath = path.join(dirPath, file);
    const stat = fs.lstatSync(fullPath);
    const isDirectory = stat.isDirectory();
    structure += `${'  '.repeat(level)}|-- ${file}\n`;
    if (isDirectory) {
      structure += getDirectoryStructure(fullPath, level + 1);
    }
  }

  return structure;
}

function generateProjectStructure() {
  const rootPath = path.resolve('..', '..');
  let structure = 'Structure of project root:\n';
  structure += getDirectoryStructure(rootPath);

  return structure;
}

const projectStructure = generateProjectStructure();
console.log(projectStructure);

export { getDirectoryStructure, generateProjectStructure };
