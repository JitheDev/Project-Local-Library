// return author with correct ID
function findAuthorById(authors, id) {
  return locateId(authors, id);
}
//return book with correct ID
function findBookById(books, id) {
  return locateId(books, id);
}

function partitionBooksByBorrowedStatus(books) {
  // First array contains books that have been returned
  let booksReturned = books.filter((book) =>
   book.borrows.every((borrow) => borrow.returned === true)
  );
  //not yet returned books.borrows.returned === false
  let booksBorrowed = books.filter((book) =>
  book.borrows.some((borrow) => borrow.returned === false)
 );
 let finalArray = [[...booksBorrowed], [...booksReturned]];
 return finalArray;
}
// map method to loop through the borrows array 
function getBorrowersForBook(book, accounts) {
  return book.borrows
   .map((borrow) => {
    //find method within the map method to loop through the accounts array (more detailing on why this works TA assistance here)
    //looks like map just creates a new array and find is locating for when account.id and borrow.id align?
    let account = accounts.find((account) => account.id === borrow.id);
    return { ...borrow, ...account };
   })
   //still unclear about slice but was informed this will be covered later
   .slice(0, 10);
 }

module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};


//Find ID helper for multiple instances

function locateId(parameter, id) {
  return parameter.find((parameter) => parameter.id === id);
}