// fetch external notes
/* let notesList = [];
fetch("/scripts/notes.json")
  .then((blob) => blob.json())
  .then((data) => (notesList = data));
 */

// create note from formData

const formElem = document.querySelector('#form');
let notesArray = [
  {completeDate: '', completed: 'false', createdate: '2021-04-28', description: 'Woche 4 und 5', duedate: '2021-06-06', id: '0', prio: '4', rating: '4', title: 'Hausaufgaben machen'},
  {completeDate: '', completed: 'false', createdate: '2021-02-20', description: 'Wasserleitung', duedate: '2021-11-11', id: '1', prio: '2', rating: '2', title: 'Sanitär anrufen'},
  {completeDate: '', completed: 'true', createdate: '2021-10-12', description: 'Lorem ipsum', duedate: '2020-10-25', id: '2', prio: '3', rating: '3', title: 'Geburtstag feiern'},
  {completeDate: '', completed: 'false', createdate: '2019-09-25', description: 'Some description', duedate: '2021-09-09', id: '3', prio: '1', rating: '1', title: 'Stern Rating machen'}];

const notesListElement = document.querySelector('#notes-list');

function createNoteHtml(notesArray) {
  return notesArray
    .map(
      (note) => `
  
  
        <form class="note"">
          <div class="note-row row-first">
            <div>
              <label class="note-form-label" for="duedate">Due date:</label>
              <input
                class="note-form-input"
                type="date"
                name="duedate"
                value=${note.duedate}
                data-id="${note.id}"
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
                data-id="${note.id}"
                
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
              data-id="${note.id}"
              readonly
              
              />

              <textarea
              class="note-form-textarea"
              name="description"
              data-id="${note.id}"
              readonly
              value="${note.description}"
              >${note.description}</textarea>
              
              <div class="rating"> 
                <input type="radio" id="star${note.id + 5}+${note.id + 5}" name="rating" value="5" /><label for="star${note.id + 5}+${note.id + 5}" class="full"></label>
                <input type="radio" id="star${note.id + 4}+${note.id + 4}" name="rating" value="4" /><label for="star${note.id + 4}+${note.id + 4}" class="full"></label>
                <input type="radio" id="star${note.id + 3}+${note.id + 3}" name="rating" value="3" checked /><label for="star${note.id + 3}+${note.id + 3}" class="full"></label>
                <input type="radio" id="star${note.id + 2}+${note.id + 2}" name="rating" value="2" /><label for="star${note.id + 2}+${note.id + 2}" class="full"></label>
                <input type="radio" id="star${note.id + 1}+${note.id + 1}" name="rating" value="1" /><label for="star${note.id + 1}+${note.id + 1}" class="full"></label>
      
              </div>
              
              <p>${note.rating}</p>
          </div>

          <div class="note-row row-third">
            <button class="btn-note btn-edit" data-action="edit" data-id="${note.id}"><i class="ph-pencil"></i> Edit</button>
            <button class="btn-note btn-cancel"><i class="ph-x"></i> Cancel</button>
          </div>
            
        </form>
    `,
    )
    .join('');
}

function renderNotes() {
  notesListElement.innerHTML = createNoteHtml(notesArray);
  /* document
    .querySelectorAll('.btn-edit')
    .forEach((button) => button.addEventListener('click', editNoteMode)); */
}

// event handler registriern auch div #notes-list
document.querySelector('#notes-list').addEventListener('click', (e) => {
  e.preventDefault();
  if (e.target.dataset.action === 'edit') {
    e.target.dataset.action = 'save';
    e.target.innerText = 'Save';
    editNoteMode(e);
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
  const completed = false;
  const completeDate = '';
  const id = notesArray.length;

  formData.set('createdate', createDate);
  formData.set('completed', completed);
  formData.set('completeDate', completeDate);
  formData.set('id', id);

  notesArray.push(Object.fromEntries(formData));

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
