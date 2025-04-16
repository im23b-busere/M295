const getBooks = (req, res) => {
    const { author, year } = req.query;

    let filteredBooks = books;


    if (author) {
        filteredBooks = filteredBooks.filter(book => book.author === author);
    }

    if (year) {
        filteredBooks = filteredBooks.filter(book => book.year === parseInt(year));
    }

    res.json(filteredBooks);
};

const getBook = (req, res) => {
    const book = books.find(book => book.id === parseInt(req.params.id));
    if (!book) {
        return res.status(404).send('Book not found');
    }
    res.json(book);
};

const createBook = (req, res) => {

    const {title, author, year} = req.body;

    if (!title || !author) {
        return res.status(400).json({error: "Missing required fields author or title"});
    }

    if (typeof req.body !== 'object') {
        return res.status(400).json('Invalid data type');
    }

    if (title === undefined || author === undefined) {
        return res.status(400).send('Missing required fields author or title');
    }

    if (title==="" || author==="") {
        return res.status(400).send('Missing required fields');
    }

    if (typeof title !== 'string' || typeof author !== 'string') {
        return res.status(400).json({error:'Invalid data types'});
    }
    if (year && typeof year !== 'number' && year.length !== 4) {
        return res.status(400).json({error:'Invalid data type for year'});
    }



    const id = books.length - 1;
    const book = {id, title, author, year};
    books.push(book);
    res.status(201).json(book);


};

const deleteBook = (req, res) => {
    const bookIndex = books.findIndex(book => book.id === parseInt(req.params.id));
    if (bookIndex === -1) {
        return res.status(404).send('Book not found');
    }
    books.splice(bookIndex, 1);
    res.send('Book deleted');
};

const updateBook = (req, res) => {
    const book = books.find(book => book.id === parseInt(req.params.id));
    if (!book) {
        return res.status(404).send('Book not found');
    }
    const {title, author, year} = req.body;
    book.title = title;
    book.author = author;
    book.year = year;
    res.json(book);

};


module.exports = {
    getBooks,
    getBook,
    createBook,
    deleteBook,
    updateBook
}
