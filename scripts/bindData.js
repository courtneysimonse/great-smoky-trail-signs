// load modules
const fs = require('fs');
// const csvParse = require('csv-parse');
const chalk = require('chalk');
const mapshaper = require('mapshaper');

function processBindFiles() {

  // read districts boundaries asynchronously
  fs.readFile(__dirname + "/../project-files/admin-districts.json", 'utf8', (err, geojson) => {

    // output error to console
    if (err) throw err;

    // filter properties to only keep "PARKDISTRICT", simplify verticies and coordinate precision, output to geojson
    const commands = '-filter-fields PARKDISTRICT -simplify dp 5% -o precision=.0001 format=geojson';

    // run mapshaper on the council district data with the commands above
    mapshaper.applyCommands(commands, geojson, (err, data) => {

      // output error to console
      if (err) throw err;

      // save parsed data as geojson
      const geojson = JSON.parse(data);

      // read file asynchronously with utf-8 encoding
      fs.readFile(__dirname + "/../project-files/austin-traffic-signals.csv", "utf8", (err, csvString) => {

        // output error to console
        if (err) throw err;

        // parse the csv, noting that there are column headings in the first row
        csvParse(csvString, {
          columns: true
        }, (err, csv) => {

          // call bindData() function to add count of traffic signals to the council district geojson
          const outGeoJSON = bindData(geojson, csv);

          // write the data to a new file, stringifying the JS object
          fs.writeFile(__dirname + '/../data/districts-counts.json', JSON.stringify(outGeoJSON), 'utf8', function (err) {

            // output error to console
            if (err) throw err;

            // write message to console when successful
            console.log(chalk.green('districts-counts.json written'));
          })
        });
      });
    });
  });
}

function bindData(geojson, csv) {

  // loop through features in geojson
  geojson.features.forEach(function (feature) {

    // start with 0 for each feature
    let count = 0;

    // loop through each row of csv
    csv.forEach((row) => {
      // check if the council id of the row matches the one in the feature
      if (feature.properties.council_di === row.COUNCIL_DISTRICT) {
        // if it matches, increase the count by 1
        count++
      }
    });

    // add count to properties
    feature.properties.count = count;

  });

  // return geojson with count
  return geojson;

}

// export functions
exports.processBindFiles = processBindFiles;
exports.bindData = bindData;
