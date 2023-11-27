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

class Book {
    constructor(author, title, publisher, numberOfPages, isRead) {
        this.author = author;
        this.title = title;
        this.publisher = publisher;
        this.numberOfPages = numberOfPages;
        this.isRead = isRead;
    }

    toggleReadStatus() {
        this.isRead = this.isRead === "yes" ? "no" : "yes";
    }
}

function addBookToLibrary(book){
    library.push(book);
    renderBook(book, library.length);
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

document.addEventListener("DOMContentLoaded", function (){
    if (library.length && !document.querySelector("thead > tr")){
        noContentEl.classList.add("hidden");
        createTableHeader();
        library.forEach(renderBook);
    }else{
        tableEl.classList.add("hidden");
    }
})



