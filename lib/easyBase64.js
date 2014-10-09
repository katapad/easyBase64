/**
 * @usage
 * $ node easyBase64 --i path/to/dir/**.png --format=createjs -o=test.json
 *
 * --i {String} target Directory
 * --exts {String} optional 'png,jpg,jpeg,gif'
 * --format {String} optional createjs
 * --o output file
 **/
;!function(undefined) {

  var fs = require('fs');
  var argv = require('optimist').usage('Usage: -i [glob]').argv;
  var glob = require('glob');


  var isCreateJS, targetFiles, outputTarget;
  var exts = '{png,jpg,jpeg,gif}';
  if(argv.exts)
    exts = '{' + exts + '}';

  dir = argv.i;
  targetFiles = dir + '/**/*.' + exts;

  isCreateJS = argv.format === 'createjs';

  console.log('isCreateJS', isCreateJS);

  if (!targetFiles) {
    console.log('stderr: not directory');
    return;
  }

  if (argv.o)
    outputTarget = argv.o;


  convert = function () {
    glob(targetFiles, function(err, files) {
      var file, result;
      result = '';

      for (var i = 0, n = files.length; i < n; i++)
      {
        file = files[i];
        fs.readFile(file, function(err, data) {
          console.log(file + '\ndata:image/png;base64,' + data.toString('base64') + '\n\n');
          result += 'file' + data.toString('base64');
        });
      }
      console.log('result', result)
    });

  };

  module.exports = exports = {
    convert: convert
  };


}();