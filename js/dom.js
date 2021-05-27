const UNFINISHED_READ_BOOK = "unfinished"
const FINISHED_READ_BOOK = "finished"
const BOOK_ITEMID = "itemId";

function addBookToShelf(){
    const unfinishedReadBook = document.getElementById(UNFINISHED_READ_BOOK )
    const finishedReadBook = document.getElementById(FINISHED_READ_BOOK )
    
    const textTitle = document.getElementById("judul").value
    const textWriter = document.getElementById("penulis").value
    const textYear = document.getElementById("tahun").value
    const readBook = document.getElementById("read").checked
     
    const bookShelf = makeBookToShelf(textTitle, textWriter, textYear, readBook)
    const bookObject = composeBookObject(textTitle, textWriter, textYear, readBook)

    bookShelf[BOOK_ITEMID] = bookObject.id;
    books.push(bookObject);

    if(readBook){
        finishedReadBook.append(bookShelf);
    }else{
        unfinishedReadBook.append(bookShelf);
    }
    updateDataToStorage();
}

function makeBookToShelf(title, writer, year, isRead) {
    const img = document.createElement("img")
    img.setAttribute("src", "img/books.svg")
    img.classList.add("img-book")

    const textTitle = document.createElement("h3")
    textTitle.innerText = title
    
    const textWriter = document.createElement("p")
    textWriter.classList.add("text-writer")
    textWriter.innerText = "Penulis : " + writer

    const textYear = document.createElement("p")
    textYear.classList.add("text-year")
    textYear.innerText = "Tahun : " + year
 
    const containerDetail = document.createElement("div")
    containerDetail.classList.add("detail-book")
    containerDetail.append(textTitle, textWriter, textYear)

    const containerSpaceOne = document.createElement("div")
    containerSpaceOne.classList.add("space-one")
    containerSpaceOne.append(img, containerDetail)

    const containerSpaceTwo = document.createElement("div")
    containerSpaceTwo.classList.add("space-two")

    if(isRead){
        containerSpaceTwo.append(createUndoButton(), createDeleteButton())
    } else {
        containerSpaceTwo.append(createDoneButton(), createDeleteButton())
    }
 
    const container = document.createElement("div")
    container.classList.add("list-item", "shadow")
    container.append(containerSpaceOne, containerSpaceTwo) 
 
    return container
}

function createButton(buttonTypeClass, textContent, eventListener) {
    const button = document.createElement("button")
    button.classList.add(buttonTypeClass)
    button.textContent = textContent
    button.addEventListener("click", function (event) {
        eventListener(event)
    })
    return button
}

function addBookToFinishRead(bookElement) {
    const bookTitle = bookElement.querySelector("h3").innerText
    let bookWriter = bookElement.querySelector(".text-writer").innerText
    bookWriter = bookWriter.slice(9)
    let bookYear = bookElement.querySelector(".text-year").innerText
    bookYear = bookYear.slice(7)
 
    const newBook = makeBookToShelf(bookTitle, bookWriter, bookYear, true);

    const book = findBook(bookElement[BOOK_ITEMID]);
    book.isRead = true;
    newBook[BOOK_ITEMID] = book.id;

    const listFinished = document.getElementById(FINISHED_READ_BOOK)
    listFinished.append(newBook)
    bookElement.remove()

    updateDataToStorage();
} 

function createDoneButton() {
    return createButton("button-green", "Selesai dibaca", function(event){
        addBookToFinishRead(event.target.parentElement.parentElement)
    })
}

function removeBookFromFinished(bookElement) {
    const bookPosition = findBookIndex(bookElement[BOOK_ITEMID]);
    books.splice(bookPosition, 1);

    bookElement.remove()
    updateDataToStorage();
}

function createDeleteButton() {
    return createButton("button-red", "Tidak Tertarik", function(event){
        Swal.fire({
            title: 'Apa kamu yakin?',
            text: "kamu akan menghapus data ini!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Ya, hapus!'
          }).then((result) => {
            if (result.isConfirmed) {
              Swal.fire(
                'Deleted!',
                'Data berhasil dihapus.',
                'success'
              )
              removeBookFromFinished(event.target.parentElement.parentElement)
            }
          })
    })
}

function undoBookFromFinished(bookElement){
    const listUnfinished = document.getElementById(UNFINISHED_READ_BOOK);
    const bookTitle = bookElement.querySelector("h3").innerText
    let bookWriter = bookElement.querySelector(".text-writer").innerText
    bookWriter = bookWriter.slice(9)
    let bookYear = bookElement.querySelector(".text-year").innerText
    bookYear = bookYear.slice(7)
 
    const newBook = makeBookToShelf(bookTitle, bookWriter, bookYear, false);

    const book = findBook(bookElement[BOOK_ITEMID]);
    book.isRead = false;
    newBook[BOOK_ITEMID] = book.id;
 
    listUnfinished.append(newBook);
    bookElement.remove();

    updateDataToStorage();
}

function createUndoButton() {
    return createButton("button-blue", "Belum Selesai", function(event){
        undoBookFromFinished(event.target.parentElement.parentElement);
    });
}

function searchBook(){
    const searchText = document.getElementById("searchBook")
    searchText.addEventListener("input", function(e){
        searchValue = e.target.value
        filter = searchValue.toUpperCase();
        cardContainerUnfinished = document.getElementById("unfinished")
        cardsUnfinished = cardContainerUnfinished.getElementsByClassName("list-item")
        cardContainerFinished = document.getElementById("finished")
        cardsFinished = cardContainerFinished.getElementsByClassName("list-item")
        for (i = 0; i < cardsUnfinished.length; i++) {
            title = cardsUnfinished[i].querySelector(".space-one .detail-book h3");
            if (title.innerText.toUpperCase().indexOf(filter) > -1) {
                cardsUnfinished[i].style.display = "";
            } else {
                cardsUnfinished[i].style.display = "none";
            }
        }

        for (i = 0; i < cardsFinished.length; i++) {
            title = cardsFinished[i].querySelector(".space-one .detail-book h3");
            if (title.innerText.toUpperCase().indexOf(filter) > -1) {
                cardsFinished[i].style.display = "";
            } else {
                cardsFinished[i].style.display = "none";
            }
        }
    })
}