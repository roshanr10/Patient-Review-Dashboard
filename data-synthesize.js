const keyword_analyzer = require('keyword-analyzer');
const _ = require('lodash');
var moment = require('moment');
var Sentiment = require('sentiment');
var sentiment = new Sentiment();

const data = require('./data.json');
const dataOriginal = require('./data-original.json');
const comments = require('./comments-revised.json');

require('fs').writeFileSync('./data-synthesized.json', JSON.stringify(
    data.map(doctor => Object.assign(doctor, {
        Comments: (() => {
            var doctorsComments = (comments[doctor.Name] || [])
                .sort((e1, e2) => Number(e2.Stars) - Number(e1.Stars));

            doctorsComments = _.shuffle(doctorsComments);
            
            doctorsComments = doctorsComments.map((comment, index, array) => {
                delete comment.provider;
                comment.Date = moment().subtract(Math.round(index / (array.length - 1) * 4) * 3, "months").format("MMM YYYY");
                comment.Sentiment = sentiment.analyze(comment.Comment).comparative;
                return comment;
            });

            return doctorsComments;
        })(),
        "Review Count": dataOriginal[doctor.Id].Review_No_HG + dataOriginal[doctor.Id].Review_No_vital 
    })).map(doctor => Object.assign(doctor, {
        Keywords: keyword_analyzer
            .wrest(doctor.Comments.map(comment => comment.Comment).join(" "), {
                stopWords: [
                    "dr", "", "doctor", "medical", "patient", "doctors", "physician", "office", "patients",
                    "tales", "health", "call", "told", "questions", "primary", "practice", "answers", "answer",
                    "lot", "months", "hours", "days", "pcp", "day", "minutes", "extremely", "people",
                    "husband", "wife", "mother", "father", "son", "daughter", "hour", "month", "hospital", "week",
                    "weels", "review", "reviews", "moved", "appt", "loved", "absolutely", "medicine", "family",
                    "takes", "total", "highly", "offer", "save", "easy"
                ].concat(require('stopwords').english)
            })
            .filter(keyword => keyword.length > 3)
            .filter(keyword => !doctor.Name.toLowerCase().split(" ").includes(keyword))
            .slice(0, 8)
    }))
, null, 4))