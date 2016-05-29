const {transformFileSync} = require('babel-core')
const fs = require('fs')
const path = require('path')
const test = require('tape')
const preset = require('../src')

const fixturesDir = path.join(__dirname, 'fixtures')

fs.readdirSync(fixturesDir).map(fixture => {
  const fixtureDir = path.join(fixturesDir, fixture)
  const actual = transformFileSync(path.join(fixtureDir, 'input.js'), preset).code
  const expected = fs.readFileSync(path.join(fixtureDir, 'output.js'), 'utf-8')

  test(fixture, t => {
    t.equal(actual.trim(), expected.trim())
    t.end()
  })
})
