url = process.argv[2];
const http = require('http');

http.get(url, (res) => {
    res.on("data",(data) =>{
        console.log(data.toString());
    });
})