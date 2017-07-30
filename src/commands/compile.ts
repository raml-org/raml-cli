import converter = require('oas-raml-converter')
import path = require('path')

const cconsole = require('colorize').console

exports.command = 'compile <file> [options]'
exports.desc = 'Compiles a root RAML file into a valid OpenAPI 2.0 document.'
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

  var autoToOAS = new converter.Converter(converter.Formats.AUTO, converter.Formats.OAS)
  var options = {
    validate: true, // Parse both input and output to check that its a valid document 
    format: 'yaml', // Output format: json (default for OAS) or yaml (default for RAML) 
  };

  const file = path.resolve(process.cwd(), argv.file)
  autoToOAS.convertFile(file, options).then(function(result) {
    
    const outFile = path.resolve(process.cwd(), argv.output)

    require('fs')
      .writeFile(outFile, result, function(err) {
        if(err) {
          return cconsole.error('#red[%s]', err);
        }

        cconsole.log("#green[Successfully compiled OAS 2.0 document.]");
    });
  })
  .catch(function(err) {
    cconsole.error('#red[%s]', err);
  });
}
