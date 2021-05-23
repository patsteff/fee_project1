// toggleDarkMode on click of button
function toggleDarkMode() {
  const element = document.body;
  element.classList.toggle("dark-mode");
}

const themeToggle = document.querySelector(".theme-toggle");
themeToggle.addEventListener("change", toggleDarkMode);

// fetch external notes
/* let notesList = [];
fetch("/scripts/notes.json")
  .then((blob) => blob.json())
  .then((data) => (notesList = data));

//
setTimeout(function () {
  console.log(notesList);
  console.log(typeof notesList);
  console.log(notesList.title);
  const titleNote = document.querySelector(".titleNote");
  titleNote.innerHTML = notesList.title;
}, 2000); */

function submitNote(e) {
  e.preventDefault();
}

const formElem = document.querySelector("#form");
const notesArray = [];

formElem.onsubmit = async (e) => {
  e.preventDefault();

  const formData = new FormData(formElem);
  notesArray.push(JSON.parse(JSON.stringify(Object.fromEntries(formData))));

  console.log(typeof notesArray);
  console.log(notesArray);
  renderNotes();
  /* let response = await fetch("/article/formdata/post/user", {
    method: "POST",
    body: new FormData(formElem),

    "createDate" +
      `${new Date()}` +
      JSON.stringify(Object.fromEntries(formData)) 
  });*/

  //let result = await response.json();
};

// create html elements (create, text content = xx)
const notesListElement = document.querySelector("#notes-list");

function createNoteHtml() {
  return notesArray
    .map(
      (note) => `
  
  <div class="note">
        <div class="note-sections due-date">
          <p>${note.duedate}</p>
        </div>

        <div class="titel-prio-flex">
          <div class="note-sections project-title">
            <p>${note.title}</p>
          </div>

          <div class="note-sections">
            <p>
              <i class="ph-lightning"></i><i class="ph-lightning"></i
              ><i class="ph-lightning"></i>${note.prio}
            </p>
          </div>
        </div>

        <div class="placeholder"></div>

        <div class="note-sections finished">
          <input
            type="checkbox"
            id="finisheditems1"
            value="finished"
          />Finished
        </div>

        <div class="note-sections description">
          <textarea class="text-area" name="descrption">${note.description}</textarea>
        </div>

        <div class="note-sections edit">
          <button class="btn-small"><i class="ph-pencil"></i> Edit</button>
        </div>
      </div>`
    )
    .join("");
}

function renderNotes() {
  const noteHtml = createNoteHtml(notesArray);
  notesListElement.innerHTML = noteHtml;
}

// add finish date "false", create date, labels for display
