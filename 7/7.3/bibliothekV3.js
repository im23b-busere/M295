const express = require('express');
const session = require('express-session');
const app = express();
const port = 3001;
const booksController = require('7/7.3/booksController')

app.use(express.json())

app.use(session({
    secret: 'geheimes_schluesselwort',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));

app.get("/books", booksController.getBooks)
app.get("/books/:isbn", booksController.getBook)
app.delete("/books/:isbn", booksController.deleteBook)
app.put("/books/:isbn", booksController.updateBook)
app.post("/books", booksController.createBook)



let lends = [
    {
        id: 1,
        isbn: "9783552059087",
        customer_id: 1,
        borrowed_at: new Date().toISOString(),
        returned_at: null
    }
]

// GET /lends
app.get("/lends", (request, response) => {
    response.json(lends)
})

// GET /lends/:id
app.get("/lends/:id", (request, response) => {
    const lend = lends.find(l => l.id === request.params.id)

    if (!lend) return response.sendStatus(404)

    response.json(lend)
})

// POST /lends
app.post("/lends", (request, response) => {
    const newLend = request.body
    newLend.id = lends.length + 1
    newLend.borrowed_at = new Date().toISOString()
    newLend.returned_at = null

    if (!isValid(newLend)) return response.sendStatus(422)

    lends.push(newLend)
    response.json(newLend)
})

// PATH /lends/:id
app.patch("/lends/:id", (request, response) => {
    const lendIndex = lends.findIndex(lend => lend.id === request.params.id)

    if (lendIndex < 0) return response.sendStatus(404)

    const updateParams = (({isbn, customer_id, returned_at}) => ({isbn, customer_id, returned_at}))(request.body)
    const updatedLend = {...lends[lendIndex], ...updateParams}

    if (!isValid(updatedLend)) return response.sendStatus(422)
    if (!isLendable(updatedLend)) return response.sendStatus(422)

    lends.splice(lendIndex, 1, updatedLend)
    response.json(updatedLend)
})

function isValid(lend) {
    return lend.isbn !== undefined && lend.isbn !== "" &&
        lend.customer_id !== undefined && lend.customer_id !== "" &&
        lend.borrowed_at !== undefined && lend.borrowed_at !== "" &&
        (lend.returned_at == null || Date.parse(lend.returned_at) !== NaN)
}

function isLendable(lend) {
    let customerLends = 0
    let bookLends = 0

    lends.forEach(otherLend => {
        if (lend.isbn === otherLend.isbn && otherLend.returned_at == null) bookLends++;
        if (lend.customer_id === otherLend.customer_id && otherLend.returned_at == null) customerLends++;
    })

    return customerLends <= 3 && bookLends < 1
}

let email = "test@mail.com"
let pw = "1234"


app.post("/login", (req, res) => {
    const {username, password} = req.body;
    if (username === email && password === pw) {
        res.status(200).send('Login successful');
        req.session.authenticated = true;
    } else {
        res.status(401).send('Unauthorized: Invalid credentials');
        console.log(username, password)
    }
});

app.get('/verify', (req, res) => {
   if (req.session.authenticated) {
       res.status(200).send('Authenticated');
   } else {
       res.status(401).send('Unauthorized');
   }
});

app.listen(3001)