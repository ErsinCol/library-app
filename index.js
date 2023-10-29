const modal = document.querySelector(".modal");
const newBookBtn = document.querySelector(".new-book-btn");
const closeBtn = document.querySelector(".close-btn");
const submitBtn = document.querySelector(".submit-btn");
const title = document.querySelector("#title");
const author = document.querySelector("#author");
const numberOfPages = document.querySelector("#page");
const isRead = document.querySelector("#is_read");

const library = [];

function Book(author, title, numberOfPages, isRead){
    this.author = author;
    this.title = title;
    this.numberOfPages = numberOfPages;
    this.isRead = isRead;
}

function addBookToLibrary(book){
    library.push(book);
}

function resetForm(){
    author.value = "";
    title.value = "";
    numberOfPages.value = "";
    isRead.checked = false;
}

newBookBtn.addEventListener("click", ()=>{
    modal.showModal();
})

closeBtn.addEventListener("click", ()=>{
    modal.close();
})

submitBtn.addEventListener("click", (event)=>{
    event.preventDefault();
    const book = new Book( author.value, title.value, numberOfPages.value, isRead.checked );
    addBookToLibrary(book);
    resetForm();
    modal.close();
})
