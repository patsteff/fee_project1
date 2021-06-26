// Import the top-level function of express
import express from 'express';

import bodyParser from 'body-parser';

import notesRoutes from './routes/notesRoutes.js';

// Creates an Express application using the top-level function
const app = express();

const port = 3002;

app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json());

app.use(express.static('docs'));

app.use('/notes', notesRoutes);

app.listen(port, () => {
    // eslint-disable-next-line no-console
    console.log(`Example app listening at http://localhost:${port}`);
});
