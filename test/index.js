const {transformFileSync} = require('babel-core')
const fs = require('fs')
const compose = require('../plugins/compose')
const forEach = require('../plugins/forEach')

const output = transformFileSync('test/input.js', {plugins: [
  compose,
  forEach,
]}).code

console.log(output) // eslint-disable-line no-console
fs.writeFileSync('test/output.js', output)
