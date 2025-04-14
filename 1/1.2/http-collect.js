const url = process.argv[2];
const http = require('http');
const bl = require('bl');

http.get(url, (res) => {
    res.pipe(bl((err, data) => {
        const str = data.toString();
        console.log(str.length);
        console.log(str);
    }));
})