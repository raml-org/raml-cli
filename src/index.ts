#!/usr/bin/env node

const argv = require('yargs')
  .usage('Usage: raml-cli <command>')
  .commandDir('commands')
  .demand(1)
  .help()
  .argv
