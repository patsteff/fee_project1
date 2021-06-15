import {notesBackendStoreService} from '../services/notesBackendStoreService.js';

export class notesControllerClass {
    // Handle Author create on POST.
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
        await notesBackendStoreService.deleteNoteById(request.params.id);
        response.sendStatus(200);
    }
}

export const notesController = new notesControllerClass();
