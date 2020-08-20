/* Import NPM dependencies */
const fs = require('fs');
const parse = require('csv-parse');
const stringify = require('csv-stringify');
const _ = require('lodash');

/* Read & Parse doctor-names.csv */
fs.readFile('./doctor-names.csv', function (err, fileData) {
  parse(fileData, {columns: true, trim: true}, function(err, rows) {
    /* Map 2D names CSV data into 1D name array */
    const names = _.map(rows, row =>
      row["Name"].trim().toLowerCase().replace(/[a-z] [a-z] [a-z]/g, ' ').replace(/\s\s+/g, ' ')
    );
    console.log(JSON.stringify(names))

    /* Read & Parse comments.csv */
    fs.readFile('./comments.csv', function (err, fileData) {
      parse(fileData, {columns: false, trim: true}, function(err, rows) {
        /* Filter based on doctor name */
        const filtered = _.filter(rows, row => 
          /* Case Insensitive Comparison to Names array */
          _.includes(names, row[1].trim().toLowerCase().replace(/ [a-z] /g, ' ').replace(/\s\s+/g, ' '))
        );

        /* Print metadata to console output */
        console.log(`Total: ${rows.length} comments`);
        console.log(`Working Set: ${names.length} doctors`);
        console.log(`Working Set: ${filtered.length} comments`);
        
        /* Write new comments-filtered.csv */
        stringify(filtered, (err, data) => {
          fs.writeFileSync('./comments-filtered.csv', `URL,name,Comments,comment_star,\n${data}`);
        });
      });
    });
  });
});
