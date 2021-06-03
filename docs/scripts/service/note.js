// class to create note
function formatDate(date) {
    let month = `${date.getMonth() + 1}`;
    let day = `${date.getDate()}`;
    const year = date.getFullYear();

    if (month.length < 2) month = `0${month}`;
    if (day.length < 2) day = `0${day}`;

    return [year, month, day].join('-');
  }

class Note {
    constructor(title, description, rating, duedate, completed = false) {
        this.title = title;
        this.description = description;
        this.rating = rating;
        this.duedate = duedate;
        this.createdate = formatDate(new Date());
        this.completed = completed;
        let counter = 0;
        this.id = ++counter;
    }
}
