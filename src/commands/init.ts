import path = require('path')
import Handlebars = require('handlebars')
import fs = require('fs')

const cconsole = require('colorize').console
const inquirerPrompt = require('inquirer').createPromptModule()

var defaultTemplate = `#%RAML 1.0
title: {{title}}
{{#if description}}
description: {{description}}
{{/if}}
`

exports.command = 'init [options]'
exports.desc = 'Initialize a RAML document.'
exports.builder = {
  'template': {
    description: 'File path of a custom Handlebars template.',
    nargs: 1,
    requiresArg: true,
    alias: 't'
  }
}

exports.handler = async function(argv) {
  console.log("init...")
  const title = await inquirerPrompt({
    type: 'input',
    name: 'title',
    message: 'What is the title of your API? (empty string is not allowed):',
    validate (title) {
      if(title === '') {
        return false
      }

      return true
    } 
  })
  const description = await inquirerPrompt({
    type: 'input',
    name: 'description',
    message: 'How would you describe your API? (Enter to skip):'
  })
  const context = Object.assign({}, title, description);
  if(argv.template) {
    const file = path.resolve(process.cwd(), argv.template)
    fs.readFile(file, 'utf8', function(err, content) {
      if(err) {
        throw err
      }
      initRamlDocument(content, context)
    })
  } else {
    initRamlDocument(defaultTemplate, context)
  }
}

function initRamlDocument(source, context) {
  const template = Handlebars.compile(source);
  const raml = template(context)
  fs.writeFile("api.raml", raml, function(err) {
    if(err) {
      throw err
    }

    console.log("Initialization successful!");
}); 
}