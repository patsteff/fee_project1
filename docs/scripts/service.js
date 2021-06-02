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
  // const formRating = form.querySelectorAll('input[type=radio]');
  // formRating.forEach((rating) => console.log(rating.attributes.value.nodeValue));
  const inputAttributesToUpdate = form.querySelectorAll('.note-form-edit');
  inputAttributesToUpdate.forEach((input) => { input.readOnly = true; });
  }

function updateCheckbox(e) {
  const form = e.target.parentNode.parentNode.parentNode;

  const {index} = form.dataset;
  notesArray[index].completed = e.target.checked;
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

function filterByCompleted(e) {
  const notesArrayAll = notesArray.slice();
  console.log(notesArrayAll);
  if (e.target.checked) {
    const filterArrayCompleted = [...notesArray].filter((a) => a.completed === true);
    notesArray = filterArrayCompleted;
    renderNotes();
  } else if (!e.target.checked) {
    console.log('now its unchecked');
    notesArray = notesArrayAll;
    console.log(notesArray);
    renderNotes();
  }
}

// test mockapi, just load it from there
/* let notesListAPI = [];
fetch('https://60b15dae62ab150017ae0d8b.mockapi.io/notes')
  .then((blob) => blob.json())
  .then((data) => {
notesListAPI = data;
console.log(notesListAPI);
}); */
