import Datastore from 'nedb-promise';

// Persistent datastore with automatic loading
const notesDb = new Datastore({ filename: './data/notes.db', autoload: true });

export class notesBackendStoreServiceClass {
    async getAllNotes(sortbyFromRequestParam) {
        console.log(sortbyFromRequestParam);
        switch (sortbyFromRequestParam) {
            case 'rating':
                return await notesDb.cfind({}).sort({rating: -1}).exec();
                break;
            case 'duedate':
                return await notesDb.cfind({}).sort({duedate: -1}).exec();
                break;
            case 'createdate':
                return await notesDb.cfind({}).sort({createdate: -1}).exec();
                break;
            default:
                return await notesDb.cfind({}).sort({duedate: -1}).exec();
        }
    }

    async getNoteById(idFromRequestParam) {
        return await notesDb.findOne({_id: idFromRequestParam});
    }

    async createNote(noteContentFromRequestBody) {
        return await notesDb.insert(noteContentFromRequestBody);
    }

    async updateNoteById(idFromRequestParam, newNote) {
        console.log('backendStore newNote', newNote);

        const oldNote = await this.getNoteById(idFromRequestParam);
        console.log('backendStore oldNote', oldNote);
        return await notesDb.update(oldNote, newNote);
    }

    async deleteNoteById(idFromRequestParam) {
        return await notesDb.remove({_id: idFromRequestParam});
    }
}

export const notesBackendStoreService = new notesBackendStoreServiceClass();
