function getTotalBooksCount(books) {
    return books.reduce((total) => {
      total++;
  return total;
    }, 0);
  }
  
function getTotalAccountsCount(accounts) {
  //Below helper function covers account counting
  return ItemCount(accounts);
}

function getBooksBorrowedCount(books) {
  return books.reduce((borrowCount, { borrows }) => {
    //If most has not been returned, then increase the total
    const mostRecent = borrows[0];
    if (!mostRecent.returned) borrowCount++;
    return borrowCount;
  }, 0);
}

function getMostCommonGenres(books) {
  const result = books.reduce((accum, book) => {
    // acquire current genre
    const genre = book.genre;
    //name needs to be the same as the genre
    const genreInfo = accum.find((item) => item.name === genre);
    // if not found, create a new object? and push it into accum
    if (!genreInfo) {
      const newGenreInfo = {
        name: genre,
        count: 1,
      };
      accum.push(newGenreInfo);
    } else {
      genreInfo.count++;
    }
    return accum;
  }, []);
  // sort the array by count from greatest to least
  result.sort((genreA, genreB) => genreB.count - genreA.count);
  // limiting to 5 (inquire more about splice)
  result.splice(5);
  return result;
}

function getMostPopularBooks(books) {
  return books
   .map((book) => {
    return { name: book.title, count: book.borrows.length };
   })
   .sort((a, b) => (a.count < b.count ? 1 : -1))
   .slice(0, 5);
 }

  function getMostPopularAuthors(books, authors) {
    // create array of authors by popularity with map
    const result = authors.map((author) => {
      const fullName = `${author.name.first} ${author.name.last}`;
      const booksByAuthor = getBooksByAuthorId(books, author.id);
      const totalBorrows = booksByAuthor.reduce((accum, book) => accum + book.borrows.length, 0);
      const newAuthorInfo = {
        name: fullName,
        count: totalBorrows,
      };
      return newAuthorInfo;
    });
  
    // sort the new array by count: greatest to least
    result.sort((authorA, authorB) => authorB.count - authorA.count);
  
    // limit array to 5
    result.splice(5);
  
    return result;
  }
//helper function for coutning array items
function ItemCount(product) {
  return product.length;
}

//Filter helper function for ID's
const getBooksByAuthorId = (books, authorId) => {
  return books.filter((book) => book.authorId === authorId);
};

module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
