// class to create note
function formatDate(date) {
    let month = `${date.getMonth() + 1}`;
    let day = `${date.getDate()}`;
    const year = date.getFullYear();

    if (month.length < 2) month = `0${month}`;
    if (day.length < 2) day = `0${day}`;

    return [year, month, day].join('-');
  }

export default class Note {
    constructor(title, description, rating, duedate, createdate = formatDate(new Date()), completed = false) {
        this.title = title;
        this.description = description;
        this.rating = rating;
        this.duedate = duedate;
        this.createdate = createdate;
        this.completed = completed;
    }
}
