const express = require('express');
const path = require('path');
const app = express();
const port = 3000;
const session = require('express-session');
const jwt = require('jsonwebtoken');

app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use(session({
    secretKey: 'geheimes_schluesselwort',
    resave: false,
    saveUninitialized: true,
    cookie: {secure: false}
}));

username = 'admin';
password = 'password';

tasks = [
    {
        id: 1,
        title: 'Aufgabe 1',
        description: 'Beschreibung der Aufgabe 1',
        status: 'offen'
    },
    {
        id: 2,
        title: 'Aufgabe 2',
        description: 'Beschreibung der Aufgabe 2',
        status: 'erledigt'
    },
    {
        id: 3,
        title: 'Aufgabe 3',
        description: 'Beschreibung der Aufgabe 3',
        status: 'in Bearbeitung'
    }
]

app.get('/tasks', (req, res) => {
    const token = req.headers.authorization?.split(' ')[1];
    try {
        const decoded = jwt.verify(token, secretKey);
        const token = req.headers.authorization?.split(' ')[1];

    res.status(200).json(tasks);
    } catch (err) {
        res.status(401).send('Ungültiger Token');
    }

});

app.post('/tasks', (req, res) => {
    const token = req.headers.authorization?.split(' ')[1];

    try {
        const decoded = jwt.verify(token, secretKey);


        const {title, description, status} = req.body;
        const newTask = {
            id: tasks.length + 1,
            title,
            description,
            status
        };
        tasks.push(newTask);
        res.status(201).json(newTask);
    } catch (err) {
        res.status(401).send('Ungültiger Token');
    }
});


app.get('/tasks/:id', (req, res) => {
    const token = req.headers.authorization?.split(' ')[1];
    try {
        const decoded = jwt.verify(token, secretKey);
        const task = tasks.find(t => t.id === parseInt(req.params.id));
        if (!task) return res.status(404).send('Task not found');
        res.json(task);
    } catch (err) {
        res.status(401).send('Ungültiger Token');
    }
});

app.patch('/tasks/:id', (req, res) => {

    const task = tasks.find(t => t.id === parseInt(req.params.id));
    if (!task) return res.status(404).send('Task not found');

    const {title, description, status} = req.body;

    if (title) task.title = title;
    if (description) task.description = description;
    if (status) task.status = status;

    res.json(task);
});

app.delete('/tasks/:id', (req, res) => {
    const taskIndex = tasks.findIndex(t => t.id === parseInt(req.params.id));
    if (taskIndex === -1) return res.status(404).send('Task not found');

    tasks.splice(taskIndex, 1);
    res.status(204).send();
});

// LOGIN

app.get('/login', (req, res) => {
    const {username, password} = req.query;

    // check if username & password are correct
    if (username === 'admin' && password === 'password') {
        const token = jwt.sign({username}, secretKey, {expiresIn: '1h'});
        req.session.user = username;
        res.status(200).send('Login successful');
    } else {
        res.status(401).send('Invalid credentials');
    }
});

app.get('/verify', (req, res) => {
    const token = req.headers.authorization?.split(' ')[1];

    try {
        const decoded = jwt.verify(token, secretKey);
        res.status(200).send(`Hallo ${decoded.username}, du hast Zugriff.`);
    } catch (err) {
        res.status(401).send('Ungültiger Token');
    }
});

app.listen(port, () => {
    console.log(`Server läuft auf http://localhost:${port}`);
});