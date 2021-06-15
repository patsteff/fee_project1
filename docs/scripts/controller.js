import noteList from './service/note-service.js';

// toggleDarkMode on click of button
function toggleDarkMode() {
    const element = document.body;
    element.classList.toggle('dark-mode');
  }

  const themeToggle = document.querySelector('.theme-toggle');
  themeToggle.addEventListener('change', toggleDarkMode);

const formElem = document.querySelector('#form');

// create test data
noteList.createTestNotes();

const notesListElement = document.querySelector('#notes-list');

function editNoteMode(e) {
  const form = e.target.parentNode.parentNode;
  const inputsToUpdate = form.querySelectorAll('.note-form-edit');
  inputsToUpdate.forEach((input) => input.removeAttribute('readonly'));
  const ratingsToUpdate = form.querySelectorAll('input[type=radio], input[type=checkbox]');
  ratingsToUpdate.forEach((rating) => rating.removeAttribute('disabled'));
  }

  function createNoteHtml(noteList) {
    return noteList
      .map((note) => `
    
    
          <form class="note ${note.completed ? 'completed' : ''}" data-index=${note._id}>
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
                <input type="checkbox" name="complete" id="checkboxid${note._id}" ${note.completed ? 'checked' : ''} disabled>
                <label for="checkboxid${note._id}">Completed</label>
              </div>
            
            </div>  
  
            <div class="note-row row-second">
                <input
                class="note-form-input note-form-title note-form-edit"
                type="text"
                name="title"
                value = "${note.title}"
                data-index=${note._id}
                readonly
                />
  
                <textarea
                class="note-form-textarea note-form-edit"
                name="description"
                readonly
                value="${note.description}"
                >${note.description}</textarea>
                
                <div class="rating"> 
                  <input type="radio" id="light5+${note._id}" name="rating" value="5" ${note.rating === '5' ? 'checked' : ''} disabled />
                  <label for="light5+${note._id}"><i class="ph-lightning"></i></label>
                  <input type="radio" id="light4+${note._id}" name="rating" value="4" ${note.rating === '4' ? 'checked' : ''} disabled/>
                  <label for="light4+${note._id}"><i class="ph-lightning"></i></label>
                  <input type="radio" id="light3+${note._id}" name="rating" value="3" ${note.rating === '3' ? 'checked' : ''} disabled/>
                  <label for="light3+${note._id}"><i class="ph-lightning"></i></label>
                  <input type="radio" id="light2+${note._id}" name="rating" value="2" ${note.rating === '2' ? 'checked' : ''} disabled/>
                  <label for="light2+${note._id}"><i class="ph-lightning"></i></label>
                  <input type="radio" id="light1+${note._id}" name="rating" value="1" ${note.rating === '1' ? 'checked' : ''} disabled/>
                  <label for="light1+${note._id}"><i class="ph-lightning"></i></label>
        
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
     noteList.getNotes().then((response) => {
      notesListElement.innerHTML = createNoteHtml(response);
     });
  }

function deleteNote(e) {
    const form = e.target.parentNode.parentNode;
    const id = form.dataset.index;
    noteList.deleteNote(id);
    renderNotes();
  }

function getRating() {
    let rating = [];
    const radios = document.querySelectorAll('input[type=radio]');
    radios.forEach((a) => (a.checked ? rating.push(a) : ''));
    rating = rating[0].value;
    return rating;
  }

// view: collect update note from DOM
function updateNote(e) {
  const form = e.target.parentNode.parentNode;
  const id = form.dataset.index;
  const formTitle = form.querySelector('.note-form-title').value;
  const formDue = form.querySelector('.note-form-duedate').value;
  const formCreate = form.querySelector('.note-form-createdate').value;
  const formDescription = form.querySelector('.note-form-textarea').value;
  const formRating = getRating();
  const formCompleted = form.querySelector('input[type=checkbox]').checked;
  const formArray = [];
  formArray.push(formTitle, formDescription, formRating, formDue, formCreate, formCompleted);
  noteList.updateNoteById(id, formTitle, formDescription, formRating, formDue, formCreate, formCompleted).then((response) => {
    // add class to checkbox for filter on completed
    if (formCompleted) {
      form.classList.add('completed');
    } else {
    form.classList.remove('completed');
    }
    // update GUI to readonly
    const inputsToUpdate = form.querySelectorAll('.note-form-edit');
    inputsToUpdate.forEach((input) => { input.readOnly = true; });
    const ratingsToUpdate = form.querySelectorAll('input[type=radio], input[type=checkbox]');
    ratingsToUpdate.forEach((rating) => rating.disabled = true);
  });
}

// register event handler in div #notes-list
 document.querySelector('#notes-list').addEventListener('click', (e) => {
  if (e.target.dataset.action === 'edit') {
    e.target.dataset.action = 'save';
    e.target.innerHTML = '<i class="ph-check"></i> Save';
    editNoteMode(e);
    return;
  }

  if (e.target.dataset.action === 'save') {
    updateNote(e);
    e.target.dataset.action = 'edit';
    e.target.innerHTML = '<i class="ph-pencil"></i> Edit';
    return;
  }

  if (e.target.dataset.action === 'delete') {
    deleteNote(e);
  }
});

formElem.addEventListener('submit', async (e) => {
  e.preventDefault();
  const title = document.querySelector('#title').value;
  const description = document.querySelector('#description').value;
  const duedate = document.querySelector('#duedate').value;
  const rating = getRating();

  noteList.addNote(title, description, rating, duedate);

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
