const fs = require('fs')

module.exports = {
  process(src, filename) {
    return {
      code:
        'module.exports = ' +
        JSON.stringify(fs.readFileSync(filename, 'utf8')) +
        ';',
    }
  },
}
