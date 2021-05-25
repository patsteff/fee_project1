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

// create note from formData
const formElem = document.querySelector("#form");
let notesArray = [];

formElem.addEventListener("submit", async (e) => {
  function formatDate(date) {
    let month = "" + (date.getMonth() + 1),
      day = "" + date.getDate(),
      year = date.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return [year, month, day].join("-");
  }

  e.preventDefault();

  const formData = new FormData(formElem);
  const createDate = formatDate(new Date());
  const completed = false;
  const completeDate = "";

  formData.set("createdate", createDate);
  formData.set("completed", completed);
  formData.set("completeDate", completeDate);

  notesArray.push(JSON.parse(JSON.stringify(Object.fromEntries(formData))));

  console.log(notesArray);

  renderNotes();

  // formElem.reset();
});

// create html elements (create html)
const notesListElement = document.querySelector("#notes-list");

function createNoteHtml(notesArray) {
  return notesArray
    .map(
      (note) => `
  
  
        <form class="note">
          <div class="note-row row-first">
            <div>
              <label class="note-form-label" for="duedate">Due date:</label>
              <input
                class="note-form-input"
                type="date"
                name="duedate"
                value=${note.duedate}
                readonly
                />
            </div>
            
            <div class="">
              <label class="note-form-label" for="createdate">Create date:</label>
              <input
                class="note-form-input"
                type="date"
                name="createdate"
                value="${note.createdate}"
                readonly
                />   
            </div>             
              
            <div class="">
              <input type="checkbox" name="complete">
              <label for="complete">Completed</label>
            </div>
          
          </div>  

          <div class="note-row row-second">
              <input
              class="note-form-input note-form-title"
              type="text"
              name="title"
              value = "${note.title}"
              readonly
              />

              <textarea
              class="note-form-textarea"
              name="description"
              value="${note.description}"
              >${note.description}</textarea>

              <p>${note.prio}</p>
          </div>

          <div class="note-row row-third">
            <button class="btn-note btn-edit">Edit</button>
            <button class="btn-note btn-cancel">Cancel</button>
          </div>
            
        </form>
    `
    )
    .join("");
}

function renderNotes() {
  notesListElement.innerHTML = createNoteHtml(notesArray);
}

// sort by priority
function sortByPrio() {
  const sortedArrayPrio = [...notesArray].sort(
    (a, b) => parseInt(a.prio) - parseInt(b.prio)
  );
  notesArray = sortedArrayPrio;
  renderNotes();
}

function sortByCreateDate() {
  const sortedArrayCreateDate = [...notesArray].sort(
    (a, b) => parseInt(a.createdate) - parseInt(b.createdate)
  );
  notesArray = sortedArrayCreateDate;
  renderNotes();
}

function sortByDueDate() {
  console.log(notesArray);
  const sortedArrayDueDate = [...notesArray].sort((a, b) => {
    let dateA = new Date(a.duedate);
    let dateB = new Date(b.duedate);
    return dateA - dateB;
  });
  notesArray = sortedArrayDueDate;
  renderNotes();
}

function editNoteMode() {
  e.preventDefault();
  console.log("remove readonly");
}

// add event listener to sort by prio
document.querySelector("#sort-by-prio").addEventListener("click", sortByPrio);
document
  .querySelector("#sort-by-create-date")
  .addEventListener("click", sortByCreateDate);
document
  .querySelector("#sort-by-due-date")
  .addEventListener("click", sortByDueDate);

// hide create note
const createSection = document.querySelector("#create-new-note");
function hideNoteSection() {
  createSection.hidden = !createSection.hidden;
}

// event listeners
document
  .querySelector("#btn-create-note")
  .addEventListener("click", hideNoteSection);

// hide create note after "Save", comment for testing (add animation?)
// document.querySelector("#save-note").addEventListener("click", hideNoteSection);
