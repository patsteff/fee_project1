/* getNote(orderBy, filterBy) // Notes aus dem Storage abrufen
addNote(note) // neues Note in den Storage einfügen
updateNote(note) // Note im Storage aktualiseren
getNoteById(id)  // Gezielt ein Note aus dem Storage abrufen */

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
export default class NoteService {
    constructor() {
        this.notes = [];
    }

    createTestNotes() {
        const note1 = new Note('Hausaufgaben machen', 'Woche 4 und 5', '4', '2021-06-06', '2022-06-24', true);
        const note2 = new Note('Einkauf erledigen', 'Einkaufsliste schreiben', '1', '2021-07-12', '2021-03-01');
        const note3 = new Note('Kaffee trinken', 'Kaffemachine starten', '5', '2019-07-12', '2008-06-24');
        this.notes.push(note1, note2, note3);
    }

    getNotes() {
      return this.notes;
    }

    addNote(title, description, rating, duedate) {
        const createdate = formatDate(new Date());
        const completed = false;
        const addedNote = new Note(title, description, rating, duedate, createdate, completed);
        this.notes.push(addedNote);
    }

    updateNote(index, formArray) {
      this.notes[index].title = formArray[indextitle];
      this.notes[index].description = formArray[indexdescription];
      this.notes[index].rating = formArray[indexrating];
      this.notes[index].duedate = formArray[indexduedate];
      this.notes[index].createdate = formArray[indexcreatedate];
      this.notes[index].completed = formArray[indexcompleted];
    }

    deleteNote(index) {
      this.notes.splice(index, 1);
    }

   /*  getTaskIndex(note) {
        return this.notes.findIndex((noteItem) => noteItem.id === note.id);
    }
 */
    sortByCreateDate() {
        const sortedArrayCreateDate = [...this.notes].sort((a, b) => {
        const dateA = new Date(a.createdate);
        const dateB = new Date(b.createdate);
        return dateA - dateB;
        });
        this.notes = sortedArrayCreateDate;
      }

    sortByRating() {
        const sortedArrayRating = [...this.notes].sort(
        (a, b) => Number(a.rating) - Number(b.rating),
        );
        this.notes = sortedArrayRating;
      }

    sortByDueDate() {
        const sortedArrayDueDate = [...this.notes].sort((a, b) => {
          const dateA = new Date(a.duedate);
          const dateB = new Date(b.duedate);
          return dateA - dateB;
        });
        this.notes = sortedArrayDueDate;
      }
}
