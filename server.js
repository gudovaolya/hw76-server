const express = require('express');
const cors = require('cors');
const fileDb = require('./fileDb');
const messages = require('./app/messages');
const app = express();

const port = 8000;

app.use(express.json());
app.use(cors());

fileDb.init().then(() => {
    console.log('Database file was loaded!');

    app.use('/messages', messages(fileDb));

    app.listen(port, () => {
        console.log(`Server started on ${port} port!`);
    });
});