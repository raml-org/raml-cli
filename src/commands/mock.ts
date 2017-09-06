/**
 * This command handles requests to mock a specific API specification. Mocking
 * means to generate a fake service based on the examples defined in the spec
 * for any endpoint.
 * 
 * This command is using the raml-mock-service implementation underneath.
 * 
 * Github: https://github.com/raml-org/raml-mock-service
 */

const mock = require('raml-mock-service')
const http = require('http')
const finalhandler = require('finalhandler')
const Router = require('osprey').Router
const morgan = require('morgan')
const fs = require('fs')

const cconsole = require('colorize').console

exports.command = 'mock <file> [options]'
exports.desc = 'Mocks a root RAML document.'
exports.builder = {
  'port': {
    description: 'Port number to bind the proxy.',
    default: '8080',
    nargs: 1,
    requiresArg: true,
    alias: 'p'
  },
  'cors': {
    description: 'Enable CORS with the API',
    boolean: true
  }
}

exports.handler = function(argv) {
  if (!fs.existsSync(argv.file)) {
    cconsole.log('#red[File \'%s\' does not exist!]', argv.file)
    process.exit(1)
  }

  mockService(argv.file, argv.port, argv.cors);
}

/**
 * Call osprey-mocking-service to handle the input and generate a
 * mock service for a given RAML file.
 * 
 * @param file contains the API specification to generate the mocking service
 * @param port defines on which port the mocking service should run (default: 8080)
 * @param cors enables CORS with the API (default: false)
 */
function mockService(file: string, port: number, cors: boolean): void {
  var options = {
    cors: !!cors
  }
  mock.loadFile(file, options)
    .then(function (app) {
      var router = new Router()

      // Log API requests.
      router.use(morgan('combined'))
      router.use(app)

      var server = http.createServer(function (req, res) {
        router(req, res, finalhandler(req, res))
      })

      server.listen(port, function () {
        console.log('Mock service running at http://localhost:' + server.address().port)
      })
    })
    .catch(function (err) {
      console.log(err && err.stack || err.message)
      process.exit(1)
    })
}

