const path = require('path')
const fs = require('fs')

const semicolon = /;(?!(\s[a-zA-Z]+))/g
const farm = 'farm.js'
const filesplit = __filename.split('\\')
const exclude = [filesplit[filesplit.length - 1], 'node_modules', '.git', 'farm.js']

const error = (err) => {
  return err && console.log(err)
}

const folder = (stat, filename, criteria, callback) => {
  return stat.isDirectory() &&
        exclude.indexOf(filename) === -1 &&
        locate(filename, criteria, callback)
}

const js = (criteria, filename, callback) => {
  return criteria.test(filename) &&
        exclude.indexOf(filename) === -1 &&
        callback(filename)
}

const hunt = (filename, data) => {
  const semicolons = (data.match(semicolon) || []).length
  fs.writeFile(filename, data.split(semicolon).join(''), error)
  fs.appendFile(farm, Array(semicolons).fill(';').join(''), error)
}

const locate = (startPath, criteria, callback) => {
  return !fs.existsSync(startPath) ||
    fs.readdirSync(startPath).map(file => {
      const filename = path.join(startPath, file)
      const stat = fs.lstatSync(filename)
      return folder(stat, filename, criteria, callback) ||
            js(criteria, filename, callback)
    }) && console.log('Finished.')
}

const gather = (data, filename) => {
  return data && semicolon.test(data) && hunt(filename, data)
}

locate('./', /\.js$/, (filename) => fs.readFile(filename, 'utf8', (err, data) => error(err) || gather(data, filename)))
