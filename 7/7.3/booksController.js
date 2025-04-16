// booksController.js
let books = [
    { isbn: "9783552059087", title: "Book 1", author: "Author 1", year: 2020 },
    { isbn: "9781234567897", title: "Book 2", author: "Author 2", year: 2021 }
];

const getBooks = (req, res) => {
    res.json(books);
};

const getBook = (req, res) => {
    const book = books.find(b => b.isbn === req.params.isbn);
    if (!book) {
        return res.status(404).send("Book not found");
    }
    res.json(book);
};

const createBook = (req, res) => {
    const { isbn, title, author, year } = req.body;

    if (!isbn || !title || !author || !year) {
        return res.status(400).json({ error: "Missing required fields" });
    }

    if (books.some(b => b.isbn === isbn)) {
        return res.status(409).json({ error: "Book with this ISBN already exists" });
    }

    const newBook = { isbn, title, author, year };
    books.push(newBook);
    res.status(201).json(newBook);
};

const updateBook = (req, res) => {
    const book = books.find(b => b.isbn === req.params.isbn);
    if (!book) {
        return res.status(404).send("Book not found");
    }

    const { title, author, year } = req.body;
    if (title) book.title = title;
    if (author) book.author = author;
    if (year) book.year = year;

    res.json(book);
};

const deleteBook = (req, res) => {
    const bookIndex = books.findIndex(b => b.isbn === req.params.isbn);
    if (bookIndex === -1) {
        return res.status(404).send("Book not found");
    }

    books.splice(bookIndex, 1);
    res.send("Book deleted");
};

module.exports = {
    getBooks,
    getBook,
    createBook,
    updateBook,
    deleteBook
};