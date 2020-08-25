# PRS Project

## Dependencies
- [Node.JS v10.15.3](https://nodejs.org/en/)
    - NPM v6.14.5
- [VS Code](https://code.visualstudio.com)
    - any text editor/IDE will work

## Getting Environment Configured
- Install Dependencies
- Clone/download this Project Repository
- Run `npm install` within downloaded directory using Terminal/PowerShell/Command Prompt
    - This pulls specific libraries used by the scripts. Node's `npm` is similar to Python's `pip`.

## Breakdown
The codebase is split into three major sections. The first two are solely data cleansing and validating the proof of concept prior to synthesizing the information into a web dashboard.

1. `node filters.js`
    This script filters comments.csv and doctor-names.csv into comments-filtered.csv
2. `node comments.js`
    Proof of Concept, Keyword Analysis
3. `node data-synthesize.js`
    - Primary script used to generate final JSON presented on site, seen at `index.html`. 
    - This script runs some minor calculations, does keyword analysis and basic sentiment analysis and then outputs `data-synthesized.json`.

## Website
Site is dependent on `index.html`, `index.css` and `data-synthesized.json`.

The website simply takes `data-synthesized.json` and visualizes the information in a more user-friendly interface.

By uploading to the GitHub repository master branch, the [GitHub Pages](https://pages.github.com) hosting service will automatically update the live website.

## Adding new Data
Within `data-synthesize.js`, there's a comment `/* NEW DOCTOR METRICS GO HERE */`. That section is traversed for each doctor and is currently used to join the high-level doctor metadata with individual comments to one consolidated JSON structure for the web page.

If needed, more JSON/CSV files can be loaded to the script and joined into the data structure. This allows for easy integration of other approaches of topic modeling, keywords and sentiment analysis.

## Domain Configuration
Please see [GitHub Pages Custom Domains](https://docs.github.com/en/github/working-with-github-pages/configuring-a-custom-domain-for-your-github-pages-site) for more information about how to change the URL in future after domain purchase.

## Proposed TODOs (currently pending)
- [ ] Percentile Ranking based on Specialty/Composite Score
    - Top 1%, Top 5%, Top 10%, Top 25%, and Top 50%
- [ ] Filtering similar to Amazon
    - Most Recent (Default) / Top Reviews
- [ ] Welcome Page prior to Table/List View
