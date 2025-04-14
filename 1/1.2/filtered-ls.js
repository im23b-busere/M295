const dir = process.argv[2];
const ext = process.argv[3];
const fs = require('fs');

fs.readdir(dir, (err, files) => {
    if (err) {
        return console.error(err);
    }
    files.forEach(file => {
        if (file.endsWith('.' + ext)) {
            console.log(file);
        }
    });
});