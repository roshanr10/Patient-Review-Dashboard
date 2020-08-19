/* Import NPM dependencies */
const fs = require('fs');
const parse = require('csv-parse');
const _ = require('lodash');
const keyword_analyzer = require('keyword-analyzer');
const keyword_conf = {
    frequency: true,
    stopWords: [
        "dr", "", "doctor", "medical", "patient", "doctors", "physician", "office", "patients",
        "tales", "health", "call", "told", "questions", "primary", "practice", "answers", "answer",
        "lot", "months", "hours", "days", "pcp", "day", "minutes", "extremely", "people", "epstein",
        "husband", "wife", "mother", "father", "son", "daughter", "hour", "month", "hospital", "week",
        "weels", "review", "reviews", "moved", "appt"
    ].concat(require('stopwords').english)
};

fs.readFile('./comments-filtered.csv', function (err, fileData) {
  parse(fileData, {columns: true, trim: true}, function(err, rows) {
    var rows = _.map(rows, row => ({
      name: _.startCase(row["name"].trim().toLowerCase().replace(/ [a-z] /g, ' ').replace(/\s\s+/g, ' ')),
      comment: row["Comments"],
      stars: Number(row["comment_star"])
    }));
    // console.dir(rows);

    const total_text = rows
        .reduce((accum, row) => accum += " " + row["comment"], "")
        .trim();
    
    console.dir(keyword_analyzer
        .wrest(total_text.replace(/[0-9]+/g, ' '), keyword_conf)
        .reduce((accum, word) => {
            if(word[_.keys(word)[0]] > 30)
                accum.push(_.keys(word)[0]);

            return accum;
        }, [])
    );

    const perComment = rows.slice(null, 10);
    console.dir(perComment.map(comment =>
        Object.assign(comment, {
            keywords: keyword_analyzer
                .wrest(comment.comment.replace(/[0-9]+/g, ' '), keyword_conf)
                .reduce((accum, word) => {
                    if(!comment.name.toLowerCase().includes(_.keys(word)[0]))
                        accum.push(_.keys(word)[0]);

                    return accum;
                }, [])
        })
    ));
  });
});
