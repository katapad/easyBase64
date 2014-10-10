/**
 * @usage
 * $ node easyBase64 --i path/to/dir/ --format=createjs -o=test.json
 *
 * --i {String} target Directory
 * TODO --exts {String} optional 'png,jpg,jpeg,gif'
 * TODO --format {String} optional createjs
 * TODO --o output file
 **/
;!function(undefined) {

  var fs = require('fs'),
    argv = require('optimist').usage('Usage: -i [directory]').argv,
    glob = require('glob'),
    async = require('async'),
    path = require('path');


  var isCreateJS, targetFiles, outputTarget;
  var exts = '{png,jpg,jpeg,gif}';
  if(argv.exts)
    exts = '{' + exts + '}';

  dir = argv.i;

  if (!dir)
  {
    console.error('[error] specify directory. easybase64 -i directory');
    return;
  }

  cwd = path.resolve("");
  dir = path.resolve(dir);
  targetFiles = dir + '/**/*.' + exts;

  //CreateJS用のoutput用。未実装
  isCreateJS = argv.format === 'createjs';

  if (!targetFiles) {
    console.log('stderr: not directory');
    return;
  }

  //output用のファイル指定。未実装
  if (argv.o)
    outputTarget = argv.o;


  convert = function () {
    glob(targetFiles, function(err, files) {
      var resultStr = '';
      var result = [];

      async.each(files, function (file, callback) {
        fs.readFile(file, function(err, data) {
          base64Str = data.toString('base64');

          result.push({file: file.replace(cwd, ''), data: base64Str});
          callback();
        });
      }, function(err){
//        console.log('resultStr', resultStr);
        output(result);
      });
    });
  };

  output = function (list) {
    //add data:image/png
    for (var i = 0, n = list.length; i < n; i++) {
      var data = list[i];
      data.data = 'data:image/png;base64,' + data.data;
      if (isCreateJS)
      {
        data.type = 'image';
        data.id = data.file;
        delete data.file;

        data.src = data.data;
        delete data.data;
      }
    }

    console.log(JSON.stringify(list, null, 2));
  };

  module.exports = exports = {
    convert: convert
  };


}();