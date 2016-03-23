// All test suites will have a name and a list
exports = module.exports = {
  name: "dataproofer-geo-suite",
  fullName: "Geographic Data Tests",
  tests: [],      // the list of main tests to be run in the suite
  subtests: [],   // a list of tests that can be triggered by the main tests but wont be run automatically
}

var validLngLat = require('./src/validLngLat');
var voidLngLat = require('./src/voidLngLat');

exports.tests.push(
  validLngLat,
  voidLngLat
);
