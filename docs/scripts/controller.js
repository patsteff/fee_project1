/* eslint-disable no-underscore-dangle */
import noteList from './service/note-service.js';

localStorage.setItem('filter', 'duedate');

const formElem = document.querySelector('#form');

const notesListElement = document.querySelector('#notes-list');

function editNoteMode(e) {
  const form = e.target.parentNode.parentNode;
  const inputsToUpdate = form.querySelectorAll('.note-form-edit');
  inputsToUpdate.forEach((input) => input.removeAttribute('readonly'));
  const ratingsToUpdate = form.querySelectorAll('input[type=radio], input[type=checkbox]');
  ratingsToUpdate.forEach((rating) => rating.removeAttribute('disabled'));
  }

  function createNoteHtml(someList) {
    return someList
      .map((note) => `
    
    
          <form class="note ${note.completed ? 'completed' : ''} ${note._id}" data-index=${note._id}>
            <div class="note-row row-first">
              <div class="embedded first-line">
              <label for="duedate">Due date:</label>
              <input
                  class="note-form-input note-form-duedate note-form-edit"
                  type="date"
                  name="duedate"
                  value=${note.duedate}                           
                  readonly
                  
                  />
              <p class="note-form-label embedded ${moment().diff(moment(note.duedate), 'days') >= -3 && !note.completed ? 'highlight' : 'no-light'}">${moment(note.duedate, 'YYYY-MM-DD').fromNow()}</p>
                  
              </div>
              
              <div class="first-line">
                <label for="createdate">Create date:</label>
                <input
                  class="note-form-input"
                  type="date"
                  name="createdate"
                  value="${note.createdate}"                
                  readonly
                  />   
              
              </div>             
                
              <div class="first-line">
                <input type="checkbox" name="complete" id="checkboxid${note._id}" ${note.completed ? 'checked' : ''} disabled>
                <label for="checkboxid${note._id}">Completed</label>
              </div>
            
            </div>  
  
            <div class="note-row row-second">
                <div class="note-stars">
                  <input
                  class="note-form-input note-form-title note-form-edit"
                  type="text"
                  name="title"
                  value = "${note.title}"
                  data-index=${note._id}
                  readonly
                  />   
                  
                  <div class="rating embedded"> 
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
                  
                <textarea
                class="note-form-textarea note-form-edit"
                name="description"
                readonly
                value="${note.description}"
                >${note.description}</textarea>
                
                
                
              </div>
  
            <div class="note-row row-third">
              <button class="btn-note btn-edit" type="button" data-action="edit" data-index=${note._id}><i class="ph-pencil"></i> Edit</button>
              <button class="btn-note btn-delete" type="button" data-action="delete" data-index=${note._id}><i class="ph-x"></i> Delete</button>
            </div>
              
          </form>
      `)
      .join('');
  }

   function renderNotes(sortby) {
     noteList.getNotes(sortby).then((response) => {
      notesListElement.innerHTML = createNoteHtml(response);
     });
  }

function deleteNote(e) {
    const id = e.target.dataset.index;
    noteList.deleteNote(id);
    renderNotes('duedate');
  }

async function getRating(form) {
    let rating = [];
    const radios = form.querySelectorAll('input[type=radio]');

    radios.forEach((a) => (a.checked ? rating.push(a) : ''));
    rating = rating[0].value;

    return rating;
  }

// view: collect update note from DOM
async function updateNote(e) {
  const id = e.target.dataset.index;
  const form = document.querySelector(`form[data-index=${id}]`);
  console.log(form);
  const formTitle = form.querySelector('.note-form-title').value;
  const formDue = moment(form.querySelector('.note-form-duedate').value).format('YYYY-MM-DD');
  const formDescription = form.querySelector('.note-form-textarea').value;
  const formRating = await getRating(form);
  const formCompleted = form.querySelector('input[type=checkbox]').checked;
  const formArray = [];
  formArray.push(formTitle, formDescription, formRating, formDue, formCompleted);
  // eslint-disable-next-line max-len
  noteList.updateNoteById(id, formTitle, formDescription, formRating, formDue, formCompleted).then(() => {
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

    renderNotes('duedate');
  }).catch((err) => { console.log(err); });
    // add class to checkbox for filter on completed
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

// hide create note
const createSection = document.querySelector('#create-new-note');
function hideNoteSection() {
  createSection.hidden = !createSection.hidden;
}

formElem.addEventListener('submit', async (e) => {
  e.preventDefault();
  const title = document.querySelector('#title').value;
  const form = e.target;

  const description = document.querySelector('#description').value;
  const duedate = moment(document.querySelector('#duedate').value).format('YYYY-MM-DD');

  const rating = await getRating(form);
  noteList.addNote(title, description, rating, duedate);

  renderNotes('duedate');

  formElem.reset();

  hideNoteSection();
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
  noteList.getNotes('rating');
  renderNotes('rating');
});
document
  .querySelector('#sort-by-create-date')
  .addEventListener('click', () => {
    noteList.getNotes('createdate');
    renderNotes('createdate');
  });
document
  .querySelector('#sort-by-due-date')
  .addEventListener('click', () => {
    noteList.getNotes('duedate');
    renderNotes('duedate');
  });

  document
  .querySelector('#finisheditems')
  .addEventListener('click', showCompleted);

// event listener to button create note
document
  .querySelector('#btn-create-note')
  .addEventListener('click', hideNoteSection);

renderNotes('duedate');
