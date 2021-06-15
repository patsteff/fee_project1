import Datastore from 'nedb-promise';

// Persistent datastore with automatic loading
const notesDb = new Datastore({ filename: './data/notes.db', autoload: true });

export class notesBackendStoreServiceClass {
    async getAllNotes() {
        return await notesDb.find({});
    }

    async getNoteById(idFromRequestParam) {
        return await notesDb.findOne({_id: idFromRequestParam});
    }

    async createNote(noteContentFromRequestBody) {
        return await notesDb.insert(noteContentFromRequestBody);
    }

    async deleteNoteById(idFromRequestParam) {
        return await notesDb.remove({_id: idFromRequestParam});
    }
}

export const notesBackendStoreService = new notesBackendStoreServiceClass();