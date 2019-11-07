// load modules
const simplifyData = require('./simplifyData.js');
const colorScheme = require('./colorScheme.js');
const fs = require('fs');

// path to data directory
const dir = './data';

// if the directory already exists
if (fs.existsSync(dir)) {
  // loop through contents and delete files
  fs.readdirSync(dir).forEach(function (file) {
    let filePath = dir + '/' + file;
    fs.unlinkSync(filePath);
  })
  // remove the directory
  fs.rmdirSync(dir);

}

// make a directory for data files
fs.mkdir(dir, function (err) {
  if (err) throw err
});

// run the processes
simplifyData.simplifyFiles();
colorScheme.extractColors();
