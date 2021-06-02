// class to create note
class Note {
    constructor(title, description, rating, duedate) {
        this.title = title;
        this.description = description;
        this.rating = rating;
        this.duedate = duedate;
        this.createdate = new Date();
        this.completed = false;
    }
}
