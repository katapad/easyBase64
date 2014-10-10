# About

Generate Base64 from Image files.


# Getting Started

    $ npm install -g easybase64
  
  
# Usage

    $ easybase64 --i path/to/dir
    
use createjs format and output json file.

    $ easybase64 --i path/to/dir --format createjs --o output.json
    
## options

### --i 

target directory.


### --format [optional]

`--format createjs`

output example

```
[
  {
    "type": "image",
    "id": "/test/img/lena_std.jpg",
    "src": "data:image/png;base64,/9j/4AAQSkZJRgABAQEAA.........."
  }
]
```
    
### --o [optional]

output file target

`--o output.json`




# Test

    $ npm test
    
