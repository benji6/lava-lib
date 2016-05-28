const {transformFileSync} = require('babel-core')
const fs = require('fs')
const compose = require('../src/plugins/compose')
const forEach = require('../src/plugins/forEach')

const output = transformFileSync('test/input.js', {plugins: [
  compose,
  forEach,
]}).code

console.log(output) // eslint-disable-line no-console
fs.writeFileSync('test/output.js', output)
