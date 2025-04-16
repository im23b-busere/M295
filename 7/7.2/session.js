const express = require('express');
const path = require('path');
const app = express();
const port = 3000;
require('dotenv').config();
const session = require('express-session');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(session({
    secret: 'geheimes_passwort',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));

app.post('/name', (request, response) => {
    const { name } = request.body;
    request.session.name = name;
    response.send(`Name ${name} gespeichert.`);
});

app.get('/name', (request, response) => {
    if (request.session.name) {
        response.send(`Hallo ${request.session.name}`);
    } else {
        response.status(401).send('Unauthorized: Name nicht gesetzt.');
    }
});

app.listen(port, () => {
    console.log(`Server läuft auf http://localhost:${port}`);
});