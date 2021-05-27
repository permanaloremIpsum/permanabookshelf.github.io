const STORAGE_KEY = "BOOK_APPS";
 
let books = [];
 
function isStorageExist(){
   if(typeof(Storage) === undefined){
       alert("Browser tidak mendukung penggunaan local storage");
       return false
   }
   return true;
}
 
function saveData() {
   const parsed = JSON.stringify(books);
   localStorage.setItem(STORAGE_KEY, parsed);
   document.dispatchEvent(new Event("ondatasaved"));
}
 
function loadDataFromStorage() {
   const serializedData = localStorage.getItem(STORAGE_KEY);
   
   let data = JSON.parse(serializedData);
   
   if(data !== null)
       books = data;
 
   document.dispatchEvent(new Event("ondataloaded"));
}
 
function updateDataToStorage() {
   if(isStorageExist())
       saveData();
}
 
function composeBookObject(title, writer, year, isRead) {
   return {
       id: +new Date(),
       title,
       writer,
       year,
       isRead
   };
}
 
function findBook(bookId) {
   for(book of books){
       if(book.id === bookId)
           return book;
   }
   return null;
}
 
 
function findBookIndex(bookId) {
   let index = 0
   for (book of books) {
       if(book.id === bookId)
           return index;
 
       index++;
   }
 
   return -1;
}

function refreshDataFromBooks() {
    const listUnfinished = document.getElementById(UNFINISHED_READ_BOOK);
    let listFinished = document.getElementById(FINISHED_READ_BOOK);
  
  
    for(book of books){
        const bookShelf = makeBookToShelf(book.title, book.writer, book.year, book.isRead);
        bookShelf[BOOK_ITEMID] = book.id;
  
  
        if(book.isRead){
            listFinished.append(bookShelf);
        } else {
            listUnfinished.append(bookShelf);
        }
    }
 }