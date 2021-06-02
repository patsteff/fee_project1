// toggleDarkMode on click of button
function toggleDarkMode() {
    const element = document.body;
    element.classList.toggle('dark-mode');
  }

  const themeToggle = document.querySelector('.theme-toggle');
  themeToggle.addEventListener('change', toggleDarkMode);

// create note from formData

const formElem = document.querySelector('#form');
let notesArray = [
  {completeDate: '', completed: false, createdate: '2021-04-28', description: 'Woche 4 und 5', duedate: '2021-06-06', id: '0', prio: '4', rating: '4', title: 'Hausaufgaben machen'},
  {completeDate: '', completed: false, createdate: '2021-02-20', description: 'Wasserleitung', duedate: '2021-11-11', id: '1', prio: '2', rating: '2', title: 'Sanitär anrufen'},
  {completeDate: '', completed: true, createdate: '2021-10-12', description: 'Lorem ipsum', duedate: '2020-10-25', id: '2', prio: '3', rating: '3', title: 'Geburtstag feiern'},
  {completeDate: '', completed: false, createdate: '2019-09-25', description: 'Some description', duedate: '2021-09-09', id: '3', prio: '1', rating: '1', title: 'Stern Rating machen'}];

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
              <input type="checkbox" name="complete" data-action = "togglecheckbox" id="checkboxid${note.id}" ${note.completed ? 'checked' : ''}>
              <label for="checkboxid${note.id}">Completed</label>
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
                <input type="radio" id="star${note.id + 5}+${note.id + 5}" name="rating" value="5" ${note.rating === 'value' ? 'checked' : 'not'} /><label for="star${note.id + 5}+${note.id + 5}" class="full"></label>
                <input type="radio" id="star${note.id + 4}+${note.id + 4}" name="rating" value="4" ${note.rating === 'value' ? 'checked' : 'not'} /><label for="star${note.id + 4}+${note.id + 4}" class="full"></label>
                <input type="radio" id="star${note.id + 3}+${note.id + 3}" name="rating" value="3" ${note.rating === 'value' ? 'checked' : 'not'} /><label for="star${note.id + 3}+${note.id + 3}" class="full"></label>
                <input type="radio" id="star${note.id + 2}+${note.id + 2}" name="rating" value="2" ${note.rating === 'value' ? 'checked' : 'not'} /><label for="star${note.id + 2}+${note.id + 2}" class="full"></label>
                <input type="radio" id="star${note.id + 1}+${note.id + 1}" name="rating" value="1" ${note.rating === 'value' ? 'checked' : 'not'} /><label for="star${note.id + 1}+${note.id + 1}" class="full"></label>
      
              </div>
              
              <p>${note.rating}</p>
            </div>

          <div class="note-row row-third">
            <button class="btn-note btn-edit" type="submit" data-action="edit"><i class="ph-pencil"></i> Edit</button>
            <button class="btn-note btn-delete" data-action="delete"><i class="ph-x"></i> Delete</button>
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

// event handler registriern auch div #notes-list
 document.querySelector('#notes-list').addEventListener('click', (e) => {
  if (e.target.type === 'checkbox') {
    // updateNote(e);
    return;
  }

  if (e.target.nextElementSibling.type === 'radio') {
    console.log('radio');
    console.log(e.target.nextElementSibling.type.value);
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
  function formatDate(date) {
    let month = `${date.getMonth() + 1}`;
    let day = `${date.getDate()}`;
    const year = date.getFullYear();

    if (month.length < 2) month = `0${month}`;
    if (day.length < 2) day = `0${day}`;

    return [year, month, day].join('-');
  }

  e.preventDefault();

  const formData = new FormData(formElem);
  const createDate = formatDate(new Date());
  const completeDate = '';
  const id = notesArray.length;

  formData.append('createdate', createDate);
  formData.append('completed', false);
  formData.append('completeDate', completeDate);
  formData.append('id', id);

  notesArray.push(Object.fromEntries(formData));
  console.log(notesArray);
  renderNotes();

// formElem.reset();
});

// create html elements (create html)

// add event listener to sort buttons
document.querySelector('#sort-by-prio').addEventListener('click', sortByPrio);
document
  .querySelector('#sort-by-create-date')
  .addEventListener('click', sortByCreateDate);
document
  .querySelector('#sort-by-due-date')
  .addEventListener('click', sortByDueDate);

// hide create note
const createSection = document.querySelector('#create-new-note');
function hideNoteSection() {
  createSection.hidden = !createSection.hidden;
}

// event listeners to button create note
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