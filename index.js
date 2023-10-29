const modal = document.querySelector(".modal");
const newBookBtn = document.querySelector(".new-book-btn");
const closeBtn = document.querySelector(".close-btn");
const submitBtn = document.querySelector(".submit-btn");
const title = document.querySelector("#title");
const author = document.querySelector("#author");
const numberOfPages = document.querySelector("#page");
const isRead = document.querySelector("#is_read");
const htmlBodyElement = document.querySelector("body");
const htmlTBodyEl = document.querySelector("tbody");

const library = [
    {
        author: "Ersin",
        title: "Sefiller",
        numberOfPages: 124,
        isRead: true,
    },
    {
        author: "Sevgi",
        title: "Suç ve Ceza",
        numberOfPages: 300,
        isRead: false,
    }
];

function Book(author, title, numberOfPages, isRead){
    this.author = author;
    this.title = title;
    this.numberOfPages = numberOfPages;
    this.isRead = isRead;
}

function addBookToLibrary(book){
    const tableRow = document.createElement("tr");
    for (const field in book) {
        const tableCell = document.createElement("td")
        tableCell.innerText = book[field]
        tableRow.appendChild(tableCell);
    }
    htmlTBodyEl.appendChild(tableRow);
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
    const book = new Book( author.value, title.value, numberOfPages.value, isRead.checked ? "yes" : "no" );
    addBookToLibrary(book);
    resetForm();
    modal.close();
})


const fillTable = ()=>{
    const tableRows = [];
    library.forEach((book)=>{
        const currentTableRow = document.createElement("tr")
        for(const field in book){
            const currentTableCell = document.createElement("td")
            currentTableCell.innerText = book[field];
            currentTableRow.appendChild(currentTableCell);
        }
        tableRows.push(currentTableRow);
    })

    tableRows.forEach((tableRow)=>{
        htmlTBodyEl.appendChild(tableRow)
    })
}



