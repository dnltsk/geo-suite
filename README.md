# geo-suite
Suite of geographic and mapping related tests for DataProofer

## Writing tests

### Where to write tests

```
dataproofer/
├── geo-suite/
│   ├── index.js
```

### Result API

The following key/value pairs need to be returned by a test:

```
var result = {
  passed: false,  // whether or not the test passed
  message: "You're missing a column header", // descriptive text about this test: 
  template: _.template(`<span class="test-header">Missing column headers: <%= missingHeaders %></span>`)({ missingHeaders: 42}) // descriptive text which will dynamically display the results of the test
};
```