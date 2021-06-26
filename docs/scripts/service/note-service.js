/* eslint-disable class-methods-use-this */
import { httpService } from './http-service.js';
import Note from './note.js';

class NoteService {
    constructor() {
        this.notes = [];
    }

    async getNotes(sortby = 'duedate') {
      return httpService.ajax('GET', `/notes/sortby/${sortby}`, undefined);
  }

    async addNote(title, description, rating, duedate) {
      const completed = false;
      const addedNote = new Note(title, description, rating, duedate, completed);
      return httpService.ajax('POST', '/notes/', addedNote);
  }

    async getNoteById(id) {
      return httpService.ajax('GET', `/notes/${id}`, undefined);
    }

  async updateNoteById(id, fTitle, fDescription, fRating, fDue, fCreate, fCompleted) {
    const updatedNote = await new Note(fTitle, fDescription, fRating, fDue, fCreate, fCompleted);

    return httpService.ajax('PUT', `/notes/${id}`, updatedNote);
    }

  async deleteNote(id) {
      return httpService.ajax('DELETE', `/notes/${id}`, undefined);
  }
}

export default new NoteService();
