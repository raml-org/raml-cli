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

  

  init(argv.template)
}

interface UserInput {
  title: string,
  description: string
}

function init(templateFile: string): void {
  collectUserInput().then(input => {
    if(templateFile) {
      fs.readFile(templateFile, 'utf8', function(err, content) {
        if(err) {
          cconsole.error('#red[%s]', err)
          process.exit(1)
        }
        
        initRamlDocument(content, input)
      })
    } else {
      initRamlDocument(defaultTemplate, input)
    }
  })
  .catch(function(err) {
    cconsole.error('#red[%s]', err)
    process.exit(1)
  })
}

async function collectUserInput(): Promise<UserInput> {
  const titleInput = await inquirerPrompt({
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

  const descInput = await inquirerPrompt({
    type: 'input',
    name: 'description',
    message: 'How would you describe your API? (Enter to skip):'
  })

  return {
    title: titleInput.title,
    description: descInput.description
  }
}

function initRamlDocument(source: string, context: UserInput): void {
  console.log(context)

  const template = Handlebars.compile(source)
  const raml = template(context)
  fs.writeFile("api.raml", raml, function(err) {
    if(err) {
      cconsole.error('#red[%s]', err)
      process.exit(1)
    }

    cconsole.log('#green[Initialization successful!]')
  }) 
}