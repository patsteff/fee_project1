/* eslint-disable class-methods-use-this */
import Datastore from 'nedb-promise';
import moment from 'moment';

// Persistent datastore with automatic loading
const notesDb = new Datastore({ filename: './data/notes.db', autoload: true });

export class NotesBackendStoreServiceClass {
    async getAllNotes(sortbyFromRequestParam) {
        switch (sortbyFromRequestParam) {
            case 'rating':
                return notesDb.cfind({}).sort({rating: -1}).exec();

            case 'duedate':
                return notesDb.cfind({}).sort({duedate: 1}).exec();

            case 'createdate':
                return notesDb.cfind({}).sort({createdate: 1}).exec();

            default:
                return notesDb.cfind({}).sort({duedate: 1}).exec();
        }
    }

    async getNoteById(idFromRequestParam) {
        return notesDb.findOne({_id: idFromRequestParam});
    }

    async createNote(noteContentFromRequestBody) {
        noteContentFromRequestBody.createdate = moment().format('YYYY-MM-DD');
        return notesDb.insert(noteContentFromRequestBody);
    }

    async updateNoteById(idFromRequestParam, newNote) {
        const oldNote = await this.getNoteById(idFromRequestParam);
        await notesDb.update(oldNote, {$set: {title: `${newNote.title}`, description: `${newNote.description}`, rating: newNote.rating, duedate: `${newNote.duedate}`, completed: newNote.completed}}, {multi: true});
        return await this.getNoteById(idFromRequestParam);
    }

    async deleteNoteById(idFromRequestParam) {
        return notesDb.remove({_id: idFromRequestParam});
    }
}

export const notesBackendStoreService = new NotesBackendStoreServiceClass();
