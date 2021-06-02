/* getNote(orderBy, filterBy) // Notes aus dem Storage abrufen
addNote(note) // neues Note in den Storage einfügen
updateNote(note) // Note im Storage aktualiseren
getNoteById(id)  // Gezielt ein Note aus dem Storage abrufen */
class NoteService {
    constructor() {
        this.notes = [];
    }

    createTestNotes() {
        const note1 = new Note('Hausaufgaben machen', 'Woche 4 und 5', '4', '2021-06-06');
        const note2 = new Note('Einkauf erledigen', 'Einkaufsliste schreiben', '1', '2021-07-12');
        this.notes.push(note1, note2);
    }

    addNote(title, description, rating, duedate) {
        const addednote = new Note(title, description, rating, duedate);
        this.notes.push(addednote);
    }
}
