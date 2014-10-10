/**
 * @usage
 * $ node easyBase64 --i path/to/dir/ --format=createjs -o=test.json
 *
 * --i {String} target Directory
 * --exts {String} optional 'png,jpg,jpeg,gif'
 * --format {String} optional createjs
 * --o output file
 **/
;!function(undefined) {

  var fs = require('fs'),
    argv = require('optimist').usage('Usage: -i [directory]').argv,
    glob = require('glob'),
    async = require('async'),
    path = require('path');


  var isCreateJS,
    targetFiles,
    outputTarget;

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
      var result = [];

      async.each(files, function (file, callback) {
        fs.readFile(file, function(err, data) {
          base64Str = data.toString('base64');

          result.push({file: file.replace(cwd, ''), data: base64Str});
          callback();
        });
      }, function(err){
        _fix(result);
        output(result);
      });
    });
  };

  _fix = function (list) {
    for (var i = 0, n = list.length; i < n; i++) {
      var data = list[i];
      data.data = 'data:image/png;base64,' + data.data;

      // for createjs format
      if (isCreateJS) {
        data.type = 'image';
        data.id = data.file;
        delete data.file;

        data.src = data.data;
        delete data.data;
      }
    }
  };

  output = function (list) {
    json = JSON.stringify(list, null, 2);

    if (outputTarget)
    {
      fs.writeFile(outputTarget, json, function(err){
        if (err)
          console.log('err', err);
        else
          console.log('complete:', outputTarget);
      });
    }
    else
    {
      console.log(json);
    }
  };

  module.exports = exports = {
    convert: convert
  };


}();