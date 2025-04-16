const express = require('express');
const app = express();
const port = 3000;

const books = [
    { title: '1984', author: 'George Orwell', isbn: '1234567890' },
    { title: 'Brave New World', author: 'Aldous Huxley', isbn: '0987654321' },
    { title: 'Fahrenheit 451', author: 'Ray Bradbury', isbn: '1122334455' },
    ];

app.get('/books', (request, response) => {
  response.json(books);

});

app.get('books:/:isbn', (request, response) => {
  const isbn = request.params.isbn;
});
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});