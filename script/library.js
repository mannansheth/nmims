
const fetchBooks = async () => {
  try {
      const response = await fetch('https://www.googleapis.com/books/v1/volumes?q=engineering+OR+science&maxResults=20');
      const data = await response.json();

      const books = data.items;
      const bookList = document.getElementById('book-list');
      
      books.forEach(book => {
          const title = book.volumeInfo.title;
          const authors = book.volumeInfo.authors ? book.volumeInfo.authors.join(', ') : 'Unknown';
          const subject = book.volumeInfo.categories ? book.volumeInfo.categories.join(', ') : 'General';
          const bookLink = book.volumeInfo.infoLink;
          
          const row = document.createElement('tr');
          row.innerHTML = `
              <td>${title}</td>
              <td>${authors}</td>
              <td>${subject}</td>
              <td><a href="${bookLink}" target="_blank">Open Book</a></td>
          `;
          
          bookList.appendChild(row);
      });
  } catch (error) {
      console.error('Error fetching books:', error);
  }
};

window.onload = fetchBooks;
