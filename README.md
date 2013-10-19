# Partially

*Partially* is a build tool for using [Hammer for Mac](http://hammerformac.com/)-like `@include`'s in your markup language of choice.

## Installation

~~~
npm install [-g] partially
~~~

## Usage

### Includes

~~~ html
<!-- @include partial.ext -->
~~~

### CLI

~~~

  Usage: partially [options]

  Options:

    -h, --help             output usage information
    -f, --file <path>      Set the template file
    -p, --partials <path>  Set the "partials" directory
    -o, --output <path>    Set the "output" directory
    -V, --version          output the version number

~~~

### API

#### Partially(file, partials, output).render(callback);

- `file` defaults to `template/index.html`.
- `partials` defaults to `partials`.
- `output` defaults to `output`.
- `callback` returns `err`, the output file's full path and the parsed content.

##### Example

~~~ javascript
var Partially = require('partially');

var file     = 'path/to/file',
    partials = 'path/to/partials',
    output   = 'path/to/output';

Partially(file, partials, output).render(function(err, filename, content) {
  if (err) { throw err; }
  console.log(content);
});
~~~

#### Partially(file, partials, output).compile(callback);

- `file` defaults to `template/index.html`.
- `partials` defaults to `partials`.
- `output` defaults to `output`.
- `callback` returns `err` and the output file's full path.

##### Example

~~~ javascript
var Partially = require('partially');

var file     = 'path/to/file',
    partials = 'path/to/partials',
    output   = 'path/to/output';

Partially(file, partials, output).compile(function(err, filename) {
  if (err) { throw err; }
  console.log('"' + filename + '" was saved.');
});
~~~

## License

The MIT License (MIT)

Copyright (c) 2013 Ellen Gummesson

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
