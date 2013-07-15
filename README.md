## Installation

To install the package you need to do the following:

```
npm install -g git+ssh://github.com/restful-api-modelling-lang/javascript-parser
```

This is only required for use within NodeJS or if you want to install the command line utility.

### Validating RAML Syntax

The command line utility can be used for validating the syntax of a RAML
file as follows:

```
raml validate myAPI.raml
```

if it succeds you see something like the following:

```
Validating myAPI.raml
OK
```

otherwise it will fail with a message containing an explanation on the error

### Generate a JSON representation of the RAML file

The command line utility also provides a way to generate a JSON representation
of the RAML file. This JSON representation has already all traits factored in
and all the !includes already processed.

You can invoke this sub-command as follows:

```
raml to-json myAPI.raml
```

### Listing Resources

You can list all the resources available in a RAML file by doing the following:

```
raml resources myAPI.raml
```