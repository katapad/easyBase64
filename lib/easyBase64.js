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

  var fs = require('fs');
  var argv = require('optimist').usage('Usage: -i [glob]').argv;
  var glob = require('glob');
  var async = require('async');


  var isCreateJS, targetFiles, outputTarget;
  var exts = '{png,jpg,jpeg,gif}';
  if(argv.exts)
    exts = '{' + exts + '}';

  dir = argv.i;
  //最後が/だったら消す。pathとかそのへん使ったほうがいいのかな。知らん。#FIXME
  dir = dir.replace(/$\//, '');
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
      var result = '';

      async.each(files, function (file, callback) {
        fs.readFile(file, function(err, data) {
          result += file + ':\n' + 'data:image/png;base64,' + data.toString('base64') + '\n\n';
          callback()
        });
      }, function(err){

        console.log('result', result)
      });
    });
  };

  module.exports = exports = {
    convert: convert
  };


}();