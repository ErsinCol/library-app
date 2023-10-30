const modal = document.querySelector(".modal");
const newBookBtn = document.querySelector(".new-book-btn");
const closeBtn = document.querySelector(".close-btn");
const submitBtn = document.querySelector(".submit-btn");
const title = document.querySelector("#title");
const author = document.querySelector("#author");
const publisher = document.querySelector("#publisher");
const numberOfPages = document.querySelector("#page");
const isRead = document.querySelector("#is_read");
const tableEl = document.querySelector("table");
const TBodyEl = document.querySelector("tbody");
const THeadEl = document.querySelector("thead");
const noContentEl = document.querySelector(".no-content");

const library = [];
const mockData = [
        {
            author: "J.K. Rowling",
            title: "Harry Potter and the Sorcerer's Stone",
            publisher: "Scholastic",
            numberOfPages: 320,
            isRead: "yes"
        },
        {
            author: "George Orwell",
            title: "1984",
            publisher: "Penguin Books",
            numberOfPages: 328,
            isRead: "yes"
        },
        {
            author: "Harper Lee",
            title: "To Kill a Mockingbird",
            publisher: "Harper Perennial",
            numberOfPages: 281,
            isRead: "yes"
        },
        {
            author: "J.R.R. Tolkien",
            title: "The Lord of the Rings: The Fellowship of the Ring",
            publisher: "Mariner Books",
            numberOfPages: 432,
            isRead: "no"
        },
        {
            author: "Dan Brown",
            title: "The Da Vinci Code",
            publisher: "Anchor Books",
            numberOfPages: 454,
            isRead: "no"
        },
        {
            author: "Agatha Christie",
            title: "Murder on the Orient Express",
            publisher: "William Morrow Paperbacks",
            numberOfPages: 256,
            isRead: "yes"
        },
        {
            author: "Jane Austen",
            title: "Pride and Prejudice",
            publisher: "Penguin Classics",
            numberOfPages: 432,
            isRead: "no"
        },
        {
            author: "F. Scott Fitzgerald",
            title: "The Great Gatsby",
            publisher: "Scribner",
            numberOfPages: 180,
            isRead: "yes"
        },
        {
            author: "Mark Twain",
            title: "The Adventures of Huckleberry Finn",
            publisher: "Dover Publications",
            numberOfPages: 224,
            isRead: "no"
        },
        {
            author: "Leo Tolstoy",
            title: "War and Peace",
            publisher: "Vintage Classics",
            numberOfPages: 1392,
            isRead: "no"
        },
        {
            author: "Stephen King",
            title: "It",
            publisher: "Scribner",
            numberOfPages: 1138,
            isRead: "no"
        },
        {
            author: "Herman Melville",
            title: "Moby-Dick",
            publisher: "Penguin Classics",
            numberOfPages: 720,
            isRead: "no"
        },
        {
            author: "Margaret Atwood",
            title: "The Handmaid's Tale",
            publisher: "Anchor Books",
            numberOfPages: 311,
            isRead: "yes"
        },
        {
            author: "Ernest Hemingway",
            title: "The Old Man and the Sea",
            publisher: "Scribner",
            numberOfPages: 127,
            isRead: "yes"
        },
        {
            author: "Jules Verne",
            title: "Twenty Thousand Leagues Under the Sea",
            publisher: "Puffin Classics",
            numberOfPages: 352,
            isRead: "yes"
        },
        {
            author: "Ray Bradbury",
            title: "Fahrenheit 451",
            publisher: "Simon & Schuster",
            numberOfPages: 249,
            isRead: "yes"
        },
        {
            author: "Emily Brontë",
            title: "Wuthering Heights",
            publisher: "Penguin Classics",
            numberOfPages: 416,
            isRead: "yes"
        },
        {
            author: "Arthur Conan Doyle",
            title: "Sherlock Holmes: The Hound of the Baskervilles",
            publisher: "Penguin Classics",
            numberOfPages: 256,
            isRead: "yes"
        },
        {
            author: "Aldous Huxley",
            title: "Brave New World",
            publisher: "Harper Perennial",
            numberOfPages: 288,
            isRead: "no"
        },
        {
            author: "Agatha Christie",
            title: "And Then There Were None",
            publisher: "William Morrow Paperbacks",
            numberOfPages: 264,
            isRead: "no"
        }
]

function Book(author, title, publisher, numberOfPages, isRead){
    this.author = author;
    this.title = title;
    this.publisher = publisher;
    this.numberOfPages = numberOfPages;
    this.isRead = isRead;
}
Book.prototype.toggleReadStatus = function (){
    this.isRead = this.isRead === "yes" ? "no" : "yes";
}

function addBookToLibrary(book){
    library.push(book);
    renderBook(book);
    noContentEl.classList.add("hidden");
    tableEl.classList.remove("hidden");
}
function resetForm(){
    author.value = "";
    title.value = "";
    publisher.value = "";
    numberOfPages.value = "";
    isRead.checked = false;
}
function openModal(){
    modal.showModal();
}
function closeModal(){
    resetForm();
    modal.close();
}
function handleAddBook(event){
    event.preventDefault();
    if(library.length === 0 && !document.querySelector("thead > tr")){
        createTableHeader();
    }
    const book = new Book( author.value, title.value, publisher.value, numberOfPages.value, isRead.checked ? "yes" : "no" );
    addBookToLibrary(book);
    closeModal();
}
function renderBook(book, index){
    const row = document.createElement("tr");
    for (const key in book) {
        if(book.hasOwnProperty(key)){
            const cell = document.createElement("td");
            if(key === "isRead"){
                const toggleStatusBtn = document.createElement("button");
                toggleStatusBtn.className = "toggle-status-btn";
                toggleStatusBtn.dataset.indexNumber = `${index}`;
                toggleStatusBtn.innerText = book[key];
                if(book[key] === "yes"){
                    toggleStatusBtn.classList.add("read-status");
                }
                toggleStatusBtn.addEventListener("click", ()=>{
                    book.toggleReadStatus();
                    toggleStatusBtn.innerText = book.isRead;
                    toggleStatusBtn.classList.toggle("read-status", book.isRead === "yes");
                })
                cell.className = "status-cell";
                cell.appendChild(toggleStatusBtn);
            }else{
                cell.innerText = book[key];
            }
            row.appendChild(cell);
        }
    }
    const actionCell = document.createElement("td");
    const removeBtn = document.createElement("button");
    removeBtn.className = "delete-btn";
    removeBtn.dataset.indexNumber = `${index}`;
    removeBtn.addEventListener("click", (event)=>{
        const selectedBookIndex = event.target.dataset.indexNumber;
        library.splice(parseInt(selectedBookIndex), 1);
        TBodyEl.removeChild(row);
        if(library.length === 0){
            tableEl.classList.add("hidden");
            noContentEl.classList.remove("hidden");
        }
    })
    const removeIcon = document.createElement("img");
    removeIcon.src = "assets/delete-outline.svg";
    removeIcon.alt = "delete-icon";
    removeIcon.className = "delete-icon";

    removeBtn.appendChild(removeIcon);
    actionCell.appendChild(removeBtn);
    row.appendChild(actionCell);

    TBodyEl.appendChild(row);
}
function createTableHeader(){
    const tableHeaderRow = document.createElement("tr");
    const authorCol = document.createElement("th");
    authorCol.innerText = "Author";
    const titleCol = document.createElement("th");
    titleCol.innerText = "Title";
    const publisherCol = document.createElement("th");
    publisherCol.innerText = "Publisher";
    const pageCol = document.createElement("th");
    pageCol.innerText = "Page"
    const isReadCol = document.createElement("th")
    isReadCol.innerText = "Is Read"
    const actionCol = document.createElement("th");

    tableHeaderRow.appendChild(authorCol)
    tableHeaderRow.appendChild(titleCol)
    tableHeaderRow.appendChild(publisherCol)
    tableHeaderRow.appendChild(pageCol)
    tableHeaderRow.appendChild(isReadCol)
    tableHeaderRow.appendChild(actionCol)

    THeadEl.appendChild(tableHeaderRow)
}

newBookBtn.addEventListener("click", openModal)

closeBtn.addEventListener("click", closeModal)

submitBtn.addEventListener("click", handleAddBook)

function fillDataTable(){
    mockData.forEach((book)=>{
        const bookObj = new Book(
            book.author,
            book.title,
            book.publisher,
            book.numberOfPages,
            book.isRead,
        )

        library.push(bookObj)
    })
}

document.addEventListener("DOMContentLoaded", function (){
    fillDataTable();

    if (library.length && !document.querySelector("thead > tr")){
        noContentEl.classList.add("hidden");
        createTableHeader();
        library.forEach(renderBook);
    }else{
        tableEl.classList.add("hidden");
    }
})



