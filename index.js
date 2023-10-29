const modal = document.querySelector(".modal");
const newBookBtn = document.querySelector(".new-book-btn");
const closeBtn = document.querySelector(".close-btn");
const submitBtn = document.querySelector(".submit-btn");
const title = document.querySelector("#title");
const author = document.querySelector("#author");
const numberOfPages = document.querySelector("#page");
const isRead = document.querySelector("#is_read");
const htmlTBodyEl = document.querySelector("tbody");

const library = [
        {
            title: "Yaşlı Adam ve Deniz",
            author: "Ernest Hemingway",
            numberOfPage: 88,
            isRead: "yes"
        },
        {
            title: "Martin Eden",
            author: "Jack London",
            numberOfPage: 125,
            isRead: "no"
        },
];

function Book(author, title, numberOfPages, isRead){
    this.author = author;
    this.title = title;
    this.numberOfPages = numberOfPages;
    this.isRead = isRead;
}

function addBookToLibrary(book){
    library.push(book);
    renderBook(book);
}

function resetForm(){
    author.value = "";
    title.value = "";
    numberOfPages.value = "";
    isRead.checked = false;
}

function renderBook(book, index){
    const row = document.createElement("tr");
    for (const field in book) {
        const cell = document.createElement("td");
        cell.innerText = book[field];
        row.appendChild(cell);
    }
    const actionCell = document.createElement("td");
    const removeBtn = document.createElement("button");
    removeBtn.className = "delete-btn";
    removeBtn.dataset.indexNumber = `${index}`;
    removeBtn.addEventListener("click", (event)=>{
        const selectedBookIndex = event.target.dataset.indexNumber;
        library.splice(parseInt(selectedBookIndex), 1);
        htmlTBodyEl.removeChild(row);
    })
    const removeIcon = document.createElement("img");
    removeIcon.src = "assets/delete-outline.svg";
    removeIcon.alt = "delete-icon";
    removeIcon.className = "delete-icon";

    removeBtn.appendChild(removeIcon);
    actionCell.appendChild(removeBtn);
    row.appendChild(actionCell);
    htmlTBodyEl.appendChild(row);
}

newBookBtn.addEventListener("click", ()=>{
    modal.showModal();
})

closeBtn.addEventListener("click", ()=>{
    resetForm();
    modal.close();
})

submitBtn.addEventListener("click", (event)=>{
    event.preventDefault();
    const book = new Book( author.value, title.value, numberOfPages.value, isRead.checked ? "yes" : "no" );
    addBookToLibrary(book);
    resetForm();
    modal.close();
})

library.forEach(renderBook);



