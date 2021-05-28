function editNoteMode(e) {
    const toggleWhater = e.target.dataset.id;

    const inputAttributesToUpdate = document.querySelectorAll(`input[data-id='${e.target.dataset.id}']`);
    const textareaAttributesToUpdate = document.querySelectorAll(`textarea[data-id='${e.target.dataset.id}']`);
    inputAttributesToUpdate.forEach((input) => input.removeAttribute('readonly'));
    textareaAttributesToUpdate.forEach((input) => input.removeAttribute('readonly'));
  }

function getNoteById() {
    console.log('nothing');
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
