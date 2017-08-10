#!/usr/bin/env node

const argv = require('yargs')
  .usage('Usage: raml <command>')
  .commandDir('commands')
  .demand(1)
  .epilogue('For more information go to https://github.com/raml-org/raml-cli')
  .help().alias('help', 'h')
  .version().alias('version', 'v')
  .argv
