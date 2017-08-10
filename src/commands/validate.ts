import raml_parser = require('raml-1-parser')
import path = require('path')
import fs = require('fs')

const cconsole = require('colorize').console

exports.command = 'validate <file>'
exports.desc = 'Validates a root RAML file against the RAML specification.'

exports.handler = function(argv) {
  cconsole.log('Validating #blue[%s]...', argv.file)
  const api = raml_parser.loadApi(argv.file, { rejectOnErrors: true, attributeDefaults: true })
  api.then(function (result) {
    cconsole.log('#green[Valid!]')
  }).catch(function(error) {
    cconsole.error('#red[%s]', JSON.stringify(error, null, 2))
    process.exit(1)
  })
}
