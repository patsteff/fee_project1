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
 */

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

// create html elements (create html)
const notesListElement = document.querySelector("#notes-list");

function createNoteHtml() {
  return notesArray
    .map(
      (note) => `
  
  
        <form class="note">
          <div class="note-row row-first">
            <div>
              <label class="note-form-label" for="duedate">Duedate:</label>
              <input
                class="note-form-input"
                type="date"
                name="duedate"
                value=${note.duedate}
                readonly
                />
            </div>
            
            <div class="inside-padding">
              <label class="note-form-label" for="createdate">Create date:</label>
              <input
                class="note-form-input"
                type="date"
                name="createdate"
                value="${2021 - 05 - 24}"
                readonly
                />   
            </div>             
              
            <div class="inside-padding">
              <input type="checkbox" name="complete">
              <label for="complete">Finish</label>
            </div>
          
          </div>  

          <div class="note-row row-second">
              <input
              class="note-form-input"
              type="text"
              name="title"
              value = ${note.title}
              readonly
              />

              <textarea
              class="note-form-textarea"
              name="description"
              value="${note.description}"
              >${note.description}</textarea>
          </div>

          <div class="note-row row-third">
            <button>Edit</button>
            <button>Cancel</button>
          </div>
            
        </form>
    `
    )
    .join("");
}

function renderNotes() {
  const noteHtml = createNoteHtml(notesArray);
  notesListElement.innerHTML = noteHtml;
}

// add finish date "false", create date, labels for display

// sort by priority

function sortByPrio() {
  console.log("test");
  console.log(notesArray);
  return [...notesArray].sort((a, b) => parseInt(a.prio) - parseInt(b.prio));
  renderNotes();
}

// add event listener to sort by prio
document.querySelector("#sort-by-prio").addEventListener("click", sortByPrio);

// hide create note
const createSection = document.querySelector("#create-new-note");
document
  .querySelector("#btn-create-note")
  .addEventListener(
    "click",
    () => (createSection.hidden = !createSection.hidden)
  );
