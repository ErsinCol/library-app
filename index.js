const dialog = document.querySelector(".modal");
const newBookBtn = document.querySelector(".new-book-btn");
const closeBtn = document.querySelector(".close-btn");

newBookBtn.addEventListener("click", ()=>{
    dialog.showModal();
})

closeBtn.addEventListener("click", ()=>{
    dialog.close();
})