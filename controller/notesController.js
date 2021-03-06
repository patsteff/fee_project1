/* eslint-disable class-methods-use-this */
import {notesBackendStoreService} from '../services/notesBackendStoreService.js';

export class NotesControllerClass {
    async getAllNotes(request, response) {
        response.json((await notesBackendStoreService.getAllNotes(request.params.sortby) || []));
    }

    async getNoteById(request, response) {
        response.send(await notesBackendStoreService.getNoteById(request.params.id));
    }

    async createNote(request, response) {
        response.send(await notesBackendStoreService.createNote(request.body));
    }

    async deleteNoteById(request, response) {
        await notesBackendStoreService.deleteNoteById(request.params.id);
        response.status(200);
        response.json({msg: 'note deleted'});
    }

    async updateNoteById(request, response) {
        await notesBackendStoreService.updateNoteById(request.params.id, request.body);
        response.status(200);
        response.json({msg: 'note updated'});
    }
}

export const notesController = new NotesControllerClass();
