console.log('Hello World');

const patricia = "das ist ein test";

// toggleDarkMode on click of button
function toggleDarkMode() {
    const element = document.body;
    element.classList.toggle("dark-mode");
}

const themeToggle = document.querySelector(".theme-toggle");
themeToggle.addEventListener("click", toggleDarkMode);

// add border and listen for clicks
const note = document.querySelectorAll(".get-border");
console.log(note);

function toggleBorder() {
    this.classList.toggle("add-border");
}

note.forEach(note => note.addEventListener("click", toggleBorder));

// import external notes
let notesList = {};
fetch("/scripts/notes.json")
    .then(blob => blob.json())
    .then(data => notesList = data)


setTimeout(function(){console.log(notesList)}, 1000);