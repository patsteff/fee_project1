// class to create note

export default class Note {
    constructor(title, description, rating, duedate, createdate, completed = false) {
        this.title = title;
        this.description = description;
        this.rating = rating;
        this.duedate = duedate;
        this.createdate = createdate;
        this.completed = completed;
    }
}
