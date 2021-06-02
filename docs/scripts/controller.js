// toggleDarkMode on click of button
function toggleDarkMode() {
    const element = document.body;
    element.classList.toggle('dark-mode');
  }

  const themeToggle = document.querySelector('.theme-toggle');
  themeToggle.addEventListener('change', toggleDarkMode);

// create note from formData

const formElem = document.querySelector('#form');
const noteList = new NoteService();
console.log(noteList);
let notesArray = [];

const notesListElement = document.querySelector('#notes-list');

function createNoteHtml(notesArray) {
  return notesArray
    .map((note, i) => `
  
  
        <form class="note" data-index=${i}>
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
                class="note-form-input"
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
                <label class="full" <input type="radio" name="rating" value="5" data-action="radio" ${note.rating === 'value' ? 'checked' : 'not'}></label>
                <label class="full" <input type="radio" name="rating" value="4" data-action="radio" ${note.rating === 'value' ? 'checked' : 'not'}></label>
                <label class="full" <input type="radio" name="rating" value="3" data-action="radio" ${note.rating === 'value' ? 'checked' : 'not'}></label>
                <label class="full" <input type="radio" name="rating" value="2" data-action="radio" ${note.rating === 'value' ? 'checked' : 'not'}></label>
                <label class="full" <input type="radio" name="rating" value="1" data-action="radio" ${note.rating === 'value' ? 'checked' : 'not'}></label>
      
              </div>
              
              <p>${note.rating}</p>
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
  notesListElement.innerHTML = createNoteHtml(notesArray);
  // console.log(document.querySelectorAll('#notes-list input[type=checkbox]'));
 /* document.querySelectorAll('#notes-list input[type=checkbox]').forEach((input) => input.addEventListener('click', (e) => {
     // e.preventDefault();
     if (e.target.checked) {
      e.target.checked = false;
    } else {
      e.target.checked = true;
    }
     console.log(e.target.checked);
  })); */
}

// register event handler in div #notes-list
 document.querySelector('#notes-list').addEventListener('click', (e) => {
  if (e.target.type === 'checkbox') {
    updateCheckbox(e);
    return;
    // Frage: warum preventDefault nicht mögilch?
  }

  console.log(e.target);
  // console.log(e.target.firstElementChild);
  // Frage: wie komme ich an den Value vom Radiobutton? Wird vom Label "überschattet"
 if (e.target.nextElementSibling === 'radio') {
    const radio = e.target.nextElementSibling;
    console.log('this is a radio button');
    // updateNote(e);
    return;
  }

  e.preventDefault();
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

  const title = document.querySelector('.title').value;
  const description = document.querySelector('.description').value;
  const rating = document.querySelector('.rating').value;
  const duedate = document.querySelector('.duedate').value;
  const formData = NoteService.addNote(title, description, rating, duedate);

  notesArray.push(formData);

  formData.append('createdate', createDate);
  // Frage: das false wird als String in formData angefügt.. und darum ist es nachher immer true.
  formData.append('completeDate', completeDate);
  formData.append('id', id);
  const x = Object.fromEntries(formData);
  x.completed = false;
  notesArray.push(Object.fromEntries(x));
  console.log(notesArray);
  renderNotes();

// formElem.reset();
});

// add event listener to sort buttons
document.querySelector('#sort-by-prio').addEventListener('click', sortByPrio);
document
  .querySelector('#sort-by-create-date')
  .addEventListener('click', sortByCreateDate);
document
  .querySelector('#sort-by-due-date')
  .addEventListener('click', sortByDueDate);

  document
  .querySelector('#finisheditems')
  .addEventListener('click', filterByCompleted);

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

  // sort by priority
  function sortByPrio() {
    const sortedArrayPrio = [...notesArray].sort(
      (a, b) => Number(a.prio) - Number(b.prio),
    );
    notesArray = sortedArrayPrio;
    renderNotes();
  }
