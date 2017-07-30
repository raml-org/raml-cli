# RAML CLI Tool

> A handy command-line tool for RAML enthusiasts.

## Features

- **validate** - Validates a root RAML file against the specification.
- **compile**  - Compiles a root RAML file into a valid OpenAPI 2.0 document.

## Installation

```
$ npm install -g raml-cli
```

## Command Overview

### `raml validate <file>`

The command can be used for validating the syntax of a RAML file as follows:

```
raml validate examples/simple.raml
```

if it succeds you see something like the following:

```
Validating examples/simple.raml...
Valid!
```

otherwise it will fail with a message containing an explanation on the error.

### `raml compile <file> [options]`

Compiles a root RAML file into a valid OpenAPI 2.0 document. It can be used as follows:

```
raml compile examples/simple.raml
```

if it succeds you see something like the following:

```
Compile examples/simple.raml...
Successfully compiled OAS 2.0 document.
```

otherwise it will fail with a message containing an explanation on the error.

#### Command options

**-o, --output [value]**

Type: `String`

Default: `openapi.yml`

Compiled OpenAPI 2.0 document file path.