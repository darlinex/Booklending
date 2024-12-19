const bookList = document.getElementById('books');
const bookForm = document.getElementById('book-form');

// Fetch books from the API
async function fetchBooks() {
    const response = await fetch('/api/books'); // Fetch the books from the API
    const books = await response.json(); // Parse the JSON response
    bookList.innerHTML = ''; // Clear the current book list
    books.forEach(book => {
        const li = document.createElement('li');
        // Correct template literal syntax
        li.textContent = `${book.title} by ${book.author} (${book.genre})`;
        bookList.appendChild(li);
    });
}

// Add a new book
bookForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const genre = document.getElementById('genre').value;

    // Send the new book data to the API
    await fetch('/api/books', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, author, genre })
    });

    bookForm.reset(); // Reset the form
    fetchBooks(); // Re-fetch the books to update the list
});

// Initial fetch to load books
fetchBooks();
