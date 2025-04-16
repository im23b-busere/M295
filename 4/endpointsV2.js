const express = require('express');
const {response} = require("express");
const app = express();
const port = 3002;
const path = require('path');
const moment = require('moment-timezone');


app.get('/now', (request, response) => {
    const timezone = request.query.tz || 'UTC';
    const time = moment.tz(timezone).format();
    response.json({ currentTime: time });
});

app.get('/zli', (request, response) => {
    response.redirect('https://www.zli.ch');
});

app.get('/name', (request, response) => {
    const names = ['Alice', 'Bob', 'Charlie'];
    const randomIndex = Math.floor(Math.random() * names.length);
    const randomName = names[randomIndex];

    response.send(randomName);
});

app.post('/name', (request, response) => {
    const name = request.body.name;
    names.push(name)
});

app.get('/html', (request, response) => {
    const htmlContent = `
        <!DOCTYPE html>
        <html>
        <head>
            <title>Mein HTML-Dokument</title>
        </head>
        <body>
            <h1>Willkommen auf meiner Seite!</h1>
            <p>Dies ist ein einfaches HTML-Dokument.</p>
        </body>
        </html>
    `;
    response.send(htmlContent);

});

app.get('/image', (request, response) => {
    const imagePath = path.join(__dirname, 'MainBefore.jpg');
    response.sendFile(imagePath);
});

app.get('/teapot', (request, response) => {
    response.status(418).send("I'm a teapot");
});

app.get('/user-agent', (request, response) => {
    const userAgent = request.get('user-agent');
    response.send(`Your User-Agent is: ${userAgent}`);
});

app.get('/secret', (request, response) => {
    response.status(403).send("I'm a secret :)");
});

app.get('/xml', (request, response) => {
    response.sendFile(path.join(__dirname, 'test.xml'));
});

app.get('/me', (request, response) => {
    const person = {
        vorname: "Max",
        nachname: "Mustermann",
        alter: 30,
        wohnort: "Zürich",
        augenfarbe: "braun"
    };
    response.json(person);
});


app.listen(port, () => {
    console.log(`Server läuft auf Port ${port}`);
});
