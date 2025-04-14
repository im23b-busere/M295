const fs = require('fs');
const path = process.argv[2];

const data = fs.readFileSync(path, 'utf8');
const lines = data.split('\n');
const lineCount = lines.length - 1;
console.log(lineCount);

