const express = require('express');
const path = require('path');
const app = express();
const port = 3000;
require('dotenv').config();

app.use(express.urlencoded({ extended: true }));

app.get('/private', (request, response) => {
    response.sendFile(path.join(__dirname, 'login.html'));
});

app.post('/login', (request, response) => {
    const { username, password } = request.body;

    if (username === process.env.USERNAME1 && password === process.env.PASSWORD) {
        response.send('Login erfolgreich!');
    } else {
        response.status(401).send('Unauthorized: Falscher Benutzername oder Passwort.');
    }
});

app.listen(port, () => {
    console.log(`Server läuft auf http://localhost:${port}`);
});