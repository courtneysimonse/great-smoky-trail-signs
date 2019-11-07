// load modules
const fs = require('fs');
const chalk = require('chalk');
const mapshaper = require('mapshaper');

function simplifyFiles() {

  // read districts boundaries asynchronously
  fs.readFile(__dirname + "/../project-files/admin-districts.geojson", 'utf8', (err, geojson) => {

    // output error to console
    if (err) throw err;

    // filter properties to only keep "PARKDISTRICT", simplify verticies and coordinate precision, output to geojson
    const commands = '-filter-fields PARKDISTRICT -simplify dp 5% -o data/boundaries.json precision=.0001 format=geojson';

    // run mapshaper on the park district data with the commands above
    mapshaper.runCommands(commands, geojson, (err) => {

      // output error to console
      if (err) throw err;

      console.log(chalk.green('park boundaries simplified and saved!'));

      // read districts boundaries asynchronously
      fs.readFile(__dirname + "/../project-files/trails.geojson", 'utf8', (err, geojson) => {

        // output error to console
        if (err) throw err;

        // filter properties to only keep "PARKDISTRICT", simplify verticies and coordinate precision, output to geojson
        const commands = '-filter-fields TRAILNAME,PARKDISTRICT -simplify dp 15% -o data/trails.json precision=.0001 format=geojson';

        // run mapshaper on the park district data with the commands above
        mapshaper.runCommands(commands, geojson, (err) => {

          // output error to console
          if (err) throw err;

          console.log(chalk.green('trails simplified and saved!'));

        });
      });
    });

  });
}

// export functions
exports.simplifyFiles = simplifyFiles;
