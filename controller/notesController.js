import {notesBackendStoreService} from '../services/notesBackendStoreService.js';

export class notesControllerClass {
    async getAllNotes(request, response) {
        response.json((await notesBackendStoreService.getAllNotes() || []));
    }

    async getNoteById(request, response) {
        response.send(await notesBackendStoreService.getNoteById(request.params.id));
    }

    async createNote(request, response) {
        response.send(await notesBackendStoreService.createNote(request.body));
    }

    async deleteNoteById(request, response) {
        console.log(request.params.id);
        await notesBackendStoreService.deleteNoteById(request.params.id);
        response.status(200);
    }

    async updateNoteById(request, response) {
        console.log(request.params.id, request.body);
        await notesBackendStoreService.updateNoteById(request.params.id, request.body);
        response.sendStatus(200);
    }
}

export const notesController = new notesControllerClass();
