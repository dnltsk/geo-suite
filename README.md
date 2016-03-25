# geo-suite
Suite of geographic and mapping related tests for Dataproofer

* [Documentation](https://github.com/dataproofer/geo-suite/blob/master/README.md)
* [Repository](https://github.com/dataproofer/geo-suite/)
* [Issues](https://github.com/dataproofer/geo-suite/issues)

## Tests

### voidLngLat.js

[src/voidLngLat.js:15-142](https://github.com/dataproofer/geo-suite/blob/2a337e71dc8e216b6351bb88a788524f28104441/src/voidLngLat.js#L15-L142 "Source code on GitHub")

Verify that columns assumed to contain longitude or latitudes have non-zero values.
These are values at 0º,0º.

**Parameters**

-   `rows` **Array** an array of objects representing rows in the spreadsheet
-   `columnHeads` **Array** an array of strings for column names of the spreadsheet

Returns **Object** describing the result

### validLngLat.js

[src/validLngLat.js:14-146](https://github.com/dataproofer/geo-suite/blob/2a337e71dc8e216b6351bb88a788524f28104441/src/validLngLat.js#L14-L146 "Source code on GitHub")

Verify that columns assumed to contain longitude or latitudes have valid values.
These are values above 180º or below -180º.

**Parameters**

-   `rows` **Array** an array of objects representing rows in the spreadsheet
-   `columnHeads` **Array** an array of strings for column names of the spreadsheet

Returns **Object** describing the result


**Parameters**

-   `rows` **Array** an array of objects representing rows in the spreadsheet
-   `columnHeads` **Array** an array of strings for column names of the spreadsheet

Returns **Object** result an object describing the result


## Development

### Getting started

```
git clone git@github.com:dataproofer/dataproofertest-js.git
cd dataproofertest-js
npm install
```
### Documentation

We use [documentation.js](https://github.com/documentationjs/documentation), but have created a handy script for regenerating documentation.

```
npm run docs
```
