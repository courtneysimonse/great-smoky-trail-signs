# map675-assign-02

## Download Data
download Great ranger districts
```shell
curl -LOk https://opendata.arcgis.com/datasets/d00a2abb48bb4ce8a1353a85a5225e3a_0.geojson
```

download trail signs
```shell
curl -LOk https://opendata.arcgis.com/datasets/6bf7755840814beb815826ad51bfa0d5_0.geojson
```

download trails
```shell
curl -LOk https://opendata.arcgis.com/datasets/256852d227c04006901dd211e36a61a7_0.geojson
```

## Simplify Data
Since these files were already in geoJSON format, I just needed to simplify them to make the data friendlier for webmapping. In scripts/simplifyData.js, there are the mapshaper commands used to filter the fields, simplify the polygons/polylines, and lower the coordinate precision of the data to make the files smaller.

## Map!
I mapped these data files on a Leaflet map using CARTOcolor's Antique color scheme and Leaflet.markercluster for the signs.
