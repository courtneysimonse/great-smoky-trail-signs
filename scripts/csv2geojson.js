const fs = require('fs');
const chalk = require('chalk');

function filterFields(geojson) {

  var features = geojson.features,
    newFeatures = [];

  features.forEach((feature) => {

    var tempProps = {};

    for (var prop in feature.properties) {
      if (prop === 'COUNCIL_DISTRICT' || prop === 'SIGNAL_ID') {
        tempProps[prop] = feature.properties[prop];
      }
    }

    newFeatures.push({
      "type": feature.type,
      "geometry": feature.geometry,
      "properties": tempProps
    });
  });

  return {
    "type": "FeatureCollection",
    "features": newFeatures
  }
}

exports.filterFields = filterFields;
