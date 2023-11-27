const modal = document.querySelector(".modal");

class Modal {
    static open(){
        modal.showModal();
    }

    static close(){
        modal.close();
    }
}

class Library {
    #books = [];

    getBooks() {
        return this.#books;
    }

    addBook(book) {
        this.#books.push(book);
    }

    removeBook(index){
        if(index >= 0 && index < this.#books.length){
            this.#books.splice(index, 1);
        }
    }

    bookCount = () => this.#books.length;
}

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

const ScreenController = function (){
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

    const library = new Library();
    const updateScreen = () => {
        THeadEl.innerHTML = "";
        TBodyEl.innerHTML = "";

        if(library.bookCount() > 0) {
            noContentEl.classList.add("hidden");
            if(!document.querySelector("thead > tr")){
                createTableHeader();
            }
            library.getBooks().forEach((book, index)=> {
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
                    const selectedBookIndex = event.currentTarget.dataset.indexNumber;
                    library.removeBook(parseInt(selectedBookIndex))
                    updateScreen();
                })
                const removeIcon = document.createElement("img");
                removeIcon.src = "assets/delete-outline.svg";
                removeIcon.alt = "delete-icon";
                removeIcon.className = "delete-icon";

                removeBtn.appendChild(removeIcon);
                actionCell.appendChild(removeBtn);
                row.appendChild(actionCell);

                TBodyEl.appendChild(row);
            });
            tableEl.classList.remove("hidden");
        }else {
            tableEl.classList.add("hidden");
            noContentEl.classList.remove("hidden");
        }
    }

    const createTableHeader = () => {
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

    function resetForm(){
        author.value = "";
        title.value = "";
        publisher.value = "";
        numberOfPages.value = "";
        isRead.checked = false;
    }

    newBookBtn.addEventListener("click", () => {
        Modal.open();
    })

    closeBtn.addEventListener("click", () => {
        resetForm();
        Modal.close();
    })

    submitBtn.addEventListener("click", (event) => {
        event.preventDefault();
        if(library.bookCount() === 0 && !document.querySelector("thead > tr")){
            createTableHeader();
        }
        const book = new Book( author.value, title.value, publisher.value, numberOfPages.value, isRead.checked ? "yes" : "no" );
        library.addBook(book);
        resetForm();
        Modal.close();
        updateScreen();
    })

    // initial render
    updateScreen();

    return {
        updateScreen,
    }
}

ScreenController();