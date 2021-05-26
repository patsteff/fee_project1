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

// event handler registriern auch div #notes-list
document.querySelector("#notes-list").addEventListener("click", (e) => {
  if (e.target.dataset.action === "edit") {
    console.log(e.target.dataset);
    e.target.dataset.action = "save";
    e.target.innerText = "Save";
  }
});

formElem.addEventListener("submit", async (e) => {
  function formatDate(date) {
    let month = "" + (date.getMonth() + 1);
    let day = "" + date.getDate();
    const year = date.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return [year, month, day].join("-");
  }

  e.preventDefault();

  const formData = new FormData(formElem);
  const createDate = formatDate(new Date());
  const completed = false;
  const completeDate = "";
  const id = notesArray.length;

  formData.set("createdate", createDate);
  formData.set("completed", completed);
  formData.set("completeDate", completeDate);
  formData.set("id", id);

  notesArray.push(Object.fromEntries(formData));

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
            <button class="btn-note btn-edit" data-action="edit" data-id="todo">Edit</button>
            <button class="btn-note btn-cancel">Cancel</button>
          </div>
            
        </form>
    `
    )
    .join("");
}

function editNoteMode(e) {
  e.preventDefault();
  console.log("remove readonly from html elements");
}

function renderNotes() {
  notesListElement.innerHTML = createNoteHtml(notesArray);
  document
    .querySelectorAll(".btn-edit")
    .forEach((button) => button.addEventListener("click", editNoteMode));
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

// add event listener to sort buttons
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

// event listeners to button create note
document
  .querySelector("#btn-create-note")
  .addEventListener("click", hideNoteSection);

// hide create note after "Save", comment out for testing (add animation?)
// document.querySelector("#save-note").addEventListener("click", hideNoteSection);

// star rating
/* let star = document.querySelectorAll('input');
let showValue = document.querySelector('#rating-value');

for (let i = 0; i < star.length; i++) {
	star[i].addEventListener('click', function() {
		i = this.value;

		showValue.innerHTML = i + " out of 5";
	});
} */
