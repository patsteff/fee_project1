/* getNote(orderBy, filterBy) // Notes aus dem Storage abrufen
addNote(note) // neues Note in den Storage einfügen
updateNote(note) // Note im Storage aktualiseren
getNoteById(id)  // Gezielt ein Note aus dem Storage abrufen */

class NoteService {
    constructor() {
        this.notes = [];
    }

    createTestNotes() {
        const note1 = new Note('Hausaufgaben machen', 'Woche 4 und 5', '4', '2021-06-06', '2022-06-24', true);
        const note2 = new Note('Einkauf erledigen', 'Einkaufsliste schreiben', '1', '2021-07-12');
        const note3 = new Note('Kaffee trinken', 'Kaffemachine starten', '5', '2019-07-12', '2008-06-24');
        this.notes.push(note1, note2, note3);
    }

    addNote(title, description, rating, duedate, completed) {
        const addednote = new Note(title, description, rating, duedate, completed);
        this.notes.push(addednote);
    }

    getTaskIndex(note) {
        return this.notes.findIndex((noteItem) => noteItem.id === note.id);
    }

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

/*     getTask(id) {
        return this.taskList.find((task) => parseInt(id) === parseInt(task.id));
    }

    getNewId() {
        return this.taskList.reduce((acc, task) => acc = acc > task.id ? acc : task.id, 0) + 1;
    } */
}

// export const taskService = new TaskService();
