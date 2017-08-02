# RAML CLI Tool

> A handy command-line tool for RAML enthusiasts.

## Features

- **validate** - Validates a root RAML file against the specification.
- **compile**  - Compiles a root RAML file into a valid OpenAPI 2.0 document.
- **init**     - Initialize a basic RAML document based on user input.

## Installation

```
$ npm install -g raml-cli
```

## Usage

```
Usage: raml <command>

Commands:
  compile <file> [options]  Compiles a root RAML file into a valid OpenAPI 2.0
                            document.
  init [options]            Initialize a RAML document.
  validate <file>           Validates a root RAML file against the RAML
                            specification.

Options:
  --help  Show help                                                    [boolean]

For more information go to https://github.com/raml-org/raml-cli
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

### `raml init [options]`

Initialize a basic RAML document based on user input. It can be used as follows:

```
raml init
```

if it succeds you see something like the following:

```
init...
? What is the title of your API? (empty string is not allowed): <your title>
? How would you describe your API? (Enter to skip): <your description>
Initialization successful!
```

otherwise it will fail with a message containing an explanation on the error.

This command is using [Handlebars](http://handlebarsjs.com/) under the hood to initialize the RAML document. The following properties are supported at the moment:

- `title` (Title of your API and is equivalent to RAML's root node `title` - required)
- `description` (Description of your API and is equivalent to RAML's root node `description` - optional)

#### Command options

**-t, --template [value]**

Type: `String`

File path of a custom Handlebars template.