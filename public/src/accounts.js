// find an account by ID
function findAccountById(accounts, id) {
  // foundID is assigned to return result
 const foundId = accounts.find((accounts) => accounts.id === id);
 return foundId;
}
//Sorting by last name. This is an object inside an object. 
function sortAccountsByLastName(accounts) {
 accounts.sort((accountA,accountB) => accountA.name.last.toLowerCase() > accountB.name.last.toLowerCase() ? 1 : -1);
 return accounts
}

function getTotalNumberOfBorrows(account, books) {
  const accountId = account.id;
  //through every book in books to see if account has checked out that book at least a minimum of 1 time
  return books.reduce((totalBorrowed, { borrows }) => {
    //if records in borrows match  accountId, increment our totalBorrowed
    if (borrows.some((record) => record.id === accountId)) totalBorrowed++;
    return totalBorrowed;
  }, 0);
}

function getBooksPossessedByAccount(account, books, authors) {
    //filter through
    return (books.filter((book) => book.borrows[0].id === account.id && !book.borrows[0].returned)
        //map all the filtered books
        .map((book) => {
          book["author"] = authors.find((author) => author.id === book.authorId);
          return book;
        })
    );
  }

module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};
