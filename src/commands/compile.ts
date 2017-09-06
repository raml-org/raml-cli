import converter = require('oas-raml-converter')

const cconsole = require('colorize').console

exports.command = 'compile <file> [options]'
exports.desc = 'Compiles a root RAML document into a valid OpenAPI 2.0 document.'
exports.builder = {
  'output': {
    description: 'Compiled OpenAPI 2.0 document file path.',
    default: './openapi.yml',
    nargs: 1,
    requiresArg: true,
    alias: 'o'
  }
}

exports.handler = function(argv) {
  cconsole.log('Compile #blue[%s]...', argv.file)

  // compile a RAML document `argv.file` into an OAS document `argv.output`
  compile(argv.file, argv.output)
}

function compile(inputFile: string, outputFile: string): void {
  var autoToOAS = new converter.Converter(converter.Formats.AUTO, converter.Formats.OAS)

  var options = {
    validate: true, // Parse both input and output to check that its a valid document 
    format: 'yaml', // Output format: json (default for OAS) or yaml (default for RAML) 
  }

  autoToOAS.convertFile(inputFile, options).then(function(result) {
    require('fs')
      .writeFile(outputFile, result, function(err) {
        if(err) {
          cconsole.error('#red[%s]', err)
          process.exit(1)
        }

        cconsole.log("#green[Successfully compiled OAS 2.0 document.]")
    })
  })
  .catch(function(err) {
    cconsole.error('#red[%s]', err)
    process.exit(1)
  })
}
