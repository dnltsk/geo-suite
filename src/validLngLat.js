var _ = require('lodash');
var DataprooferTest = require('dataproofertest-js');
var util = require('dataproofertest-js/util');
var validLngLat = new DataprooferTest();


/**
 * Verify that columns assumed to contain longitude or latitudes have valid values.
 * These are values with a latitude between -180º and 180º
 * and a longitude between -90º and 90º
 *
 * @param  {Array} rows - an array of objects representing rows in the spreadsheet
 * @param  {Array} columnHeads - an array of strings for column names of the spreadsheet
 * @return {Object} describing the result
 */
validLngLat.name('Invalid coordinates')
  .description('Check for invalid longitude and latitude values in columns presumed to contain geographic coordinates')
  .methodology(function(rows, columnHeads) {
    // Search for columns that could have longitude and/or latitude values
    var potentialLonLatColumns = [
      'longitude/latitude', 'lonlat', 'lnglat', 'x/y'
    ];
    var potentialLatLonColumns = [
      'latitude/longitude', 'latlon', 'latlng', 'y/x'
    ];
    var potentialLats = [
      'latitude', 'lat', 'y'
    ];
    var potentialLons = [
      'longitude', 'lng', 'lon', 'long', 'x'
    ];

    // keep track of the columns which match our criteria
    var latLonColumns = [];
    var lonLatColumns = [];
    var latColumns = [];
    var lonColumns = [];
    // NOTE: in the future the selectedColumns might override this
    columnHeads.forEach(function(column) {
      var lower = column.toLowerCase();
      if(potentialLatLonColumns.indexOf(lower) >= 0) {
        latLonColumns.push(column);
      }else if(potentialLonLatColumns.indexOf(lower) >= 0) {
        lonLatColumns.push(column);
      } else if(potentialLats.indexOf(lower) >= 0) {
        latColumns.push(column)
      } else if(potentialLons.indexOf(lower) >= 0) {
        lonColumns.push(column)
      }
    });

    var invalidCoords = {};
    columnHeads.forEach(function(column) { invalidCoords[column] = 0; });
    var cells = [];
    var passed = true;
    if(latLonColumns.length || lonLatColumns.length || lonColumns.length || latColumns.length ) {
      rows.forEach(function(row) {

        // we want to know if both columns are zero to detect null island
        var zeros = {
          "lat": false,
          "lon": false
        }
        // checks a single column (either lat or lon)
        // we break it out into this function so we can iterate over
        // the columns which are suspected to be lat/lon
        function checkColumn(column, latlon) {
          var cell = row[column];
          if(util.isEmpty(cell)) {
            // if the cell is empty its definitely not a valid lat/lon
            passed = false;
            invalidCoords[column] += 1;
            highlightRow[column] = 1;
          } else if(util.isNumeric(cell)) {
            // if the cell has a numeric value, we check to make sure its in the valid range
            var num = parseFloat(cell);
            if((latlon == "lat" && Math.abs(num) > 180)
               || latlon == "lon" && Math.abs(num) > 90) {
              passed = false;
              invalidCoords[column] += 1;
              highlightRow[column] = 1;
            } else {
              if(num === 0) {
                zeros[latlon] = column;
              }
              highlightRow[column] = 0;
            }
          } else {
            // this test could be overly aggressive if we wrongly guess
            // that a column contains lat/lon by name only
            passed = false;
            invalidCoords[column] += 1;
            highlightRow[column] = 1;
          }
        }

        //reset notification
        var highlightRow = {};
        columnHeads.forEach(function(column) { highlightRow[column] = 0});

        //checking
        lonLatColumns.forEach(function(column) {
          var cell = row[column];
          if (typeof(cell) === "string") {
            var coords = cell.split(",");
            checkColumn(coords[0], "lon");
            checkColumn(coords[1], "lat");
          }
        });
        latLonColumns.forEach(function(column) {
          var cell = row[column];
          if (typeof(cell) === "string") {
            var coords = cell.split(",");
            checkColumn(coords[0], "lat");
            checkColumn(coords[1], "lon");
          }
        });
        lonColumns.forEach(function(column) {
          checkColumn(column, "lon")
        });
        latColumns.forEach(function(column) {
          checkColumn(column, "lat")
        });

        //notify
        if(zeros.lon && zeros.lat) {
          passed = false;
          invalidCoords[zeros.lon] += 1;
          invalidCoords[zeros.lat] += 1;
          highlightRow[zeros.lon] = 1;
          highlightRow[zeros.lat] = 1;
        }
        cells.push(highlightRow)
      })
    }

    var summary = _.template(`
      <% _.forEach(columnHeads, function(columnHead) { %>
        <% if(invalidCoords[columnHead]) { %>
        We found <span class="test-value"><%= invalidCoords[columnHead] %></span> invalid latitudes and longitudes (<%= percent(invalidCoords[columnHead]/rows.length) %>) for column <span class="test-column"><%= columnHead %></span>. These are values above 180º or below -180º<br/>
        <% } %>
      <% }) %>
    `)({
      columnHeads: columnHeads,
      invalidCoords: invalidCoords,
      rows: rows,
      percent: util.percent
    });

    var result = {
      passed: passed, // this doesn't really fail, as it is mostly an insight
      summary: summary,
      highlightCells: cells
    };
    return result;
  });

module.exports = validLngLat;
