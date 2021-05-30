/* getNote(orderBy, filterBy) // Notes aus dem Storage abrufen
addNote(note) // neues Note in den Storage einfügen
updateNote(note) // Note im Storage aktualiseren
getNoteById(id)  // Gezielt ein Note aus dem Storage abrufen */

function editNoteMode(e) {
  const form = e.target.parentNode.parentNode;
  const {index} = form.dataset;
  const inputAttributesToUpdate = form.querySelectorAll('.note-form-edit');
  inputAttributesToUpdate.forEach((input) => input.removeAttribute('readonly'));
  }

function updateNote(e) {
  const form = e.target.parentNode.parentNode;
  const {index} = form.dataset;
  const formTitle = form.querySelector('.note-form-title');
  notesArray[index].title = formTitle.value;
  const formDuedate = form.querySelector('.note-form-duedate');
  notesArray[index].duedate = formDuedate.value;
  const formDescription = form.querySelector('.note-form-textarea');
  notesArray[index].description = formDescription.value;

  const inputAttributesToUpdate = form.querySelectorAll('.note-form-edit');
  inputAttributesToUpdate.forEach((input) => { input.readOnly = true; });
  }

function deleteNote(e) {
  const form = e.target.parentNode.parentNode;
  const {index} = form.dataset;
  notesArray.splice(index, 1);
  renderNotes();
}

function sortByCreateDate() {
    const sortedArrayCreateDate = [...notesArray].sort((a, b) => {
      const dateA = new Date(a.createdate);
      const dateB = new Date(b.createdate);
      return dateA - dateB;
    });
    notesArray = sortedArrayCreateDate;
    renderNotes();
  }

function sortByDueDate() {
    const sortedArrayDueDate = [...notesArray].sort((a, b) => {
      const dateA = new Date(a.duedate);
      const dateB = new Date(b.duedate);
      return dateA - dateB;
    });
    notesArray = sortedArrayDueDate;
    renderNotes();
  }

let notesList = [];
fetch('https://60b15dae62ab150017ae0d8b.mockapi.io/notes')
  .then((blob) => blob.json())
  .then((data) => {
notesList = data;
console.log(notesList);
});
