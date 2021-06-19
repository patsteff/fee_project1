// class to create note

export default class Note {
    constructor(title, description, rating, duedate, completed) {
        this.title = title;
        this.description = description;
        this.rating = rating;
        this.duedate = duedate;
        this.completed = completed;
    }
}
