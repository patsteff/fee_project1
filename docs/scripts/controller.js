// toggleDarkMode on click of button
import NoteService from './service/note-service.js';

function toggleDarkMode() {
    const element = document.body;
    element.classList.toggle('dark-mode');
  }

  const themeToggle = document.querySelector('.theme-toggle');
  themeToggle.addEventListener('change', toggleDarkMode);

const formElem = document.querySelector('#form');
const noteList = new NoteService();
noteList.createTestNotes();

const notesListElement = document.querySelector('#notes-list');

function createNoteHtml(noteList) {
  return noteList
    .map((note, i) => `
  
  
        <form class="note ${note.completed ? 'completed' : ''}" data-index=${i}>
          <div class="note-row row-first">
            <div>
              <label class="note-form-label" for="duedate">Due date:</label>
              <input
                class="note-form-input note-form-duedate note-form-edit"
                type="date"
                name="duedate"
                value=${note.duedate}                           
                readonly
                
                />
            </div>
            
            <div class="note-row row-first">
              <label class="note-form-label" for="createdate">Create date:</label>
              <input
                class="note-form-input note-form-createdate"
                type="date"
                name="createdate"
                value="${note.createdate}"                
                readonly
                />   
            </div>             
              
            <div class="note-row row-first">
              <input type="checkbox" name="complete" data-action = "togglecheckbox" id="checkboxid${i}" ${note.completed ? 'checked' : ''}>
              <label for="checkboxid${i}">Completed</label>
            </div>
          
          </div>  

          <div class="note-row row-second">
              <input
              class="note-form-input note-form-title note-form-edit"
              type="text"
              name="title"
              value = "${note.title}"
              data-index=${i}
              readonly
              />

              <textarea
              class="note-form-textarea note-form-edit"
              name="description"
              readonly
              value="${note.description}"
              >${note.description}</textarea>
              
              <div class="rating"> 
                <input type="radio" id="light5+${i}" name="rating" value="5" ${note.rating === '5' ? 'checked' : ''} disabled />
                <label for="light5+${i}"><i class="ph-lightning"></i></label>
                <input type="radio" id="light4+${i}" name="rating" value="4" ${note.rating === '4' ? 'checked' : ''} disabled/>
                <label for="light4+${i}"><i class="ph-lightning"></i></label>
                <input type="radio" id="light3+${i}" name="rating" value="3" ${note.rating === '3' ? 'checked' : ''} disabled/>
                <label for="light3+${i}"><i class="ph-lightning"></i></label>
                <input type="radio" id="light2+${i}" name="rating" value="2" ${note.rating === '2' ? 'checked' : ''} disabled/>
                <label for="light2+${i}"><i class="ph-lightning"></i></label>
                <input type="radio" id="light1+${i}" name="rating" value="1" ${note.rating === '1' ? 'checked' : ''} disabled/>
                <label for="light1+${i}"><i class="ph-lightning"></i></label>
      
              </div>
              
            </div>

          <div class="note-row row-third">
            <button class="btn-note btn-edit" type="button" data-action="edit"><i class="ph-pencil"></i> Edit</button>
            <button class="btn-note btn-delete" type="button" data-action="delete"><i class="ph-x"></i> Delete</button>
          </div>
            
        </form>
    `)
    .join('');
}

 function renderNotes() {
  notesListElement.innerHTML = createNoteHtml(noteList.notes);
}

// register event handler in div #notes-list
 document.querySelector('#notes-list').addEventListener('click', (e) => {
  if (e.target.type === 'checkbox') {
    updateCheckbox(e);
    return;
  }

  if (e.target.dataset.action === 'edit') {
    e.target.dataset.action = 'save';
    e.target.innerHTML = '<i class="ph-check"></i> Save';
    editNoteMode(e);
    return;
  }

  if (e.target.dataset.action === 'save') {
    prepareUpdateNote(e);
    e.target.dataset.action = 'edit';
    e.target.innerHTML = '<i class="ph-pencil"></i> Edit';
    return;
  }

  if (e.target.dataset.action === 'delete') {
    deleteNote(e);
  }
});

function editNoteMode(e) {
  const form = e.target.parentNode.parentNode;
  const {index} = form.dataset;
  const inputsToUpdate = form.querySelectorAll('.note-form-edit');
  inputsToUpdate.forEach((input) => input.removeAttribute('readonly'));
  const ratingsToUpdate = form.querySelectorAll('input[type=radio]');
  ratingsToUpdate.forEach((rating) => rating.removeAttribute('disabled'));
  }

function updateCheckbox(e) {
    const form = e.target.parentNode.parentNode.parentNode;
    const {index} = form.dataset;
    noteList.notes[index].completed = e.target.checked;
    if (e.target.checked) {
      form.classList.add('completed');
    } else {
    form.classList.remove('completed');
  }
}

function deleteNote(e) {
    const form = e.target.parentNode.parentNode;
    const {index} = form.dataset;
    noteList.deleteNote(index);
    renderNotes();
  }

// controller send note to model
function updateThisNote(array) {
  const index = array[0];
  const note = noteList.createNote(array[1], array[2], array[3], array[4], array[5], array[6]);
  noteList.updateNote(index, note);
  console.log(noteList);
}

// view collect update note
function prepareUpdateNote(e) {
  const form = e.target.parentNode.parentNode;
  const {index} = form.dataset;
  const formTitle = form.querySelector('.note-form-title').value;
  const formDuedate = form.querySelector('.note-form-duedate').value;
  const formCreatedate = form.querySelector('.note-form-createdate').value;
  const formDescription = form.querySelector('.note-form-textarea').value;
  const formRating = getRating();
  const formCompleted = form.querySelector('input[type=checkbox]').checked;
  const array = [];
  array.push(index, formTitle, formDescription, formRating, formDuedate, formCreatedate, formCompleted);
  updateThisNote(array);
  // update GUI to readonly
  const inputsToUpdate = form.querySelectorAll('.note-form-edit');
  inputsToUpdate.forEach((input) => { input.readOnly = true; });
  const ratingsToUpdate = form.querySelectorAll('input[type=radio]');
  ratingsToUpdate.forEach((rating) => rating.disabled = true);
}

function getRating() {
  let rating = [];
  const radios = document.querySelectorAll('input[type=radio]');
  radios.forEach((a) => (a.checked ? rating.push(a) : ''));
  rating = rating[0].value;
  return rating;
}

formElem.addEventListener('submit', async (e) => {
  e.preventDefault();
  const title = document.querySelector('#title').value;
  const description = document.querySelector('#description').value;
  const duedate = document.querySelector('#duedate').value;
  const rating = getRating();

  const formData = noteList.addNote(title, description, rating, duedate);

  renderNotes();

// formElem.reset();
});

function showCompleted(e) {
  const body = document.querySelector('body');
  if (e.target.checked) {
      body.classList.remove('showCompleted');
    } else {
      body.classList.add('showCompleted');
    }
  }

// add event listener to sort buttons
document.querySelector('#sort-by-prio').addEventListener('click', () => {
  noteList.sortByRating();
  renderNotes();
});
document
  .querySelector('#sort-by-create-date')
  .addEventListener('click', () => {
    noteList.sortByCreateDate();
    renderNotes();
  });
document
  .querySelector('#sort-by-due-date')
  .addEventListener('click', () => {
    noteList.sortByDueDate();
    renderNotes();
  });

  document
  .querySelector('#finisheditems')
  .addEventListener('click', showCompleted);

// hide create note
const createSection = document.querySelector('#create-new-note');
function hideNoteSection() {
  createSection.hidden = !createSection.hidden;
}

// event listener to button create note
document
  .querySelector('#btn-create-note')
  .addEventListener('click', hideNoteSection);

  renderNotes();
