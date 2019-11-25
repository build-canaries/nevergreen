// eslint-disable-next-line @typescript-eslint/no-var-requires
const fs = require('fs')

module.exports = {
  process(src, filename) {
    return 'module.exports = ' + JSON.stringify(fs.readFileSync(filename, 'utf8')) + ';'
  }
}
