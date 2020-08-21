# PRS Project

## Dependencies
-[Node.JS v10.15.3[(https://nodejs.org/en/)
    - NPM v6.14.5
- Text Editor
    - VS Code or similar is fine.

## Getting Environment Configured
- Download Repository
- Run `npm install` from downloaded directory

## Breakdown
1. `node filters.js`
    This script filters comments.csv and doctor-names.csv into comments-filtered.csv
2. `node comments.js`
    Proof of Concept, Keyword Analysis
3. `node data-synthesize.js`
    Primary script used to generate final JSON presented on site, seen at `index.html`

## Website
Site is dependent on `index.html`, `index.css` and `data-synthesized.json`.

By uploading to the GitHub repository master branch, the GitHub Pages hosting service will automatically update the live website.
