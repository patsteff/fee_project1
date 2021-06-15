/* getNote(orderBy, filterBy) // Notes aus dem Storage abrufen
addNote(note) // neues Note in den Storage einfügen
updateNote(note) // Note im Storage aktualiseren
getNoteById(id)  // Gezielt ein Note aus dem Storage abrufen */
import { httpService } from './http-service.js';
import Note from './note.js';

const indextitle = 0;
const indexdescription = 1;
const indexrating = 2;
const indexduedate = 3;
const indexcreatedate = 4;
const indexcompleted = 5;

function formatDate(date) {
  let month = `${date.getMonth() + 1}`;
  let day = `${date.getDate()}`;
  const year = date.getFullYear();

  if (month.length < 2) month = `0${month}`;
  if (day.length < 2) day = `0${day}`;

  return [year, month, day].join('-');
}
class NoteService {
    constructor() {
        this.notes = [];
    }

    createTestNotes() {
        const note1 = new Note('Hausaufgaben machen', 'Woche 4 und 5', '4', '2021-06-06', '2022-06-24', true);
        const note2 = new Note('Einkauf erledigen', 'Einkaufsliste schreiben', '1', '2021-07-12', '2021-03-01');
        const note3 = new Note('Kaffee trinken', 'Kaffemachine starten', '5', '2019-07-12', '2008-06-24');
        this.notes.push(note1, note2, note3);
    }

    async getNotes(sortby = 'duedate') {
      return httpService.ajax('GET', `/notes/sortyby/${sortby}`, undefined);
  }

    async addNote(title, description, rating, duedate) {
      const createdate = formatDate(new Date());
      const completed = false;
      const addedNote = new Note(title, description, rating, duedate, createdate, completed);
      return httpService.ajax('POST', '/notes/', addedNote);
  }

    async getNoteById(id) {
      return httpService.ajax('GET', `/notes/${id}`, undefined);
    }

  async updateNoteById(id, formTitle, formDescription, formRating, formDue, formCreate, formCompleted) {
    const updatedNote = await new Note(formTitle, formDescription, formRating, formDue, formCreate, formCompleted);
    console.log(id);
    console.log(updatedNote);
    return httpService.ajax('PUT', `/notes/${id}`, updatedNote);
    }

  async deleteNote(id) {
      return httpService.ajax('DELETE', `/notes/${id}`, undefined);
  }
}

export default new NoteService();
