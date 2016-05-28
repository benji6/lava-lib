const {transformFileSync} = require('babel-core')
const fs = require('fs')

const output = transformFileSync('test/input.js', require('../src')).code

console.log(output) // eslint-disable-line no-console
fs.writeFileSync('test/output.js', output)
