function editNoteMode(e) {
    const inputAttributesToUpdate = document.querySelectorAll(`input[data-id='${e.target.dataset.id}']`);
    const textareaAttributesToUpdate = document.querySelectorAll(`textarea[data-id='${e.target.dataset.id}']`);
    inputAttributesToUpdate.forEach((input) => input.removeAttribute('readonly'));
    textareaAttributesToUpdate.forEach((input) => input.removeAttribute('readonly'));
  }

function updateNote() {
  console.log('test');
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
