const path = require('path')
const fs = require('fs')

const location = '.'
const criteria = /\.js$/g
const semicolon = /;+(?!.)/g
const farm = 'farm.js'
const filesplit = __filename.split('\\')
const exclude = [filesplit[filesplit.length - 1], 'node_modules', '.git', farm]

const error = (err) => {
  return err && console.log(err)
}

const hunt = (filename, data) => {
  const semicolons = (data.match(semicolon) || []).length
  fs.writeFile(filename, data.split(semicolon).join(''), error)
  fs.appendFile(farm, Array(semicolons).fill(';').join(''), error)
  return semicolons
}

const locate = (startPath, callback) => {
  return fs.existsSync(startPath) &&
    fs.readdirSync(startPath).map(file => {
      const filename = path.join(startPath, file)
      const stat = fs.lstatSync(filename)
      return exclude.indexOf(filename) === -1 &&
          (
            stat.isDirectory() && locate(filename, criteria) ||
            criteria.test(filename) && callback(filename)
          )
    }) || `Incorrect path: ${startPath}`
}

const gather = (data, filename) => {
  return data && semicolon.test(data) && hunt(filename, data)
}

const find = new Promise((resolve, reject) => {
  locate(location, fn => fs.readFile(fn, 'utf8', (err, data) => {
    err && reject(err) || resolve(gather(data, fn))
  }))
})

find.then(result => {
  return result && console.log('Gathered wild semicolons.') ||
        !result && console.log('No wild semicolons found.')
}).catch(error)
