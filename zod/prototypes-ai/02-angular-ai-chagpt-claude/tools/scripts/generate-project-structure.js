const fs = require('fs')
const path = require('path')

const excludedDirs = ['coverage', 'dist', 'logs', 'node_modules','.angular','.vscode']

function printStructure(dir, prefix = '') {
  const entries = fs.readdirSync(dir, { withFileTypes: true })

  entries
    .filter(entry => {
      const fullPath = path.join(dir, entry.name)
      return !excludedDirs.some(excluded => fullPath.includes(path.sep + excluded + path.sep) || fullPath.endsWith(path.sep + excluded))
    })
    .forEach(entry => {
      console.log(prefix + '|-- ' + entry.name)
      if (entry.isDirectory()) {
        printStructure(path.join(dir, entry.name), prefix + '  ')
      }
    })
}

printStructure(process.cwd())
