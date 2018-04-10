const express = require('express');
const router = express.Router();

const createRouter = (db) => {

    router.get('/', (req, res) => {
        if (req.query.datetime){
            const date =  req.query.datetime;
            const dateUp = new Date(date);
            if (!dateUp.getDate()) {
                res.status(400).send({"error": "Invalid date"})
            } else {
                res.send(db.getDataByDatetime(date));
            }
        } else {
            res.send(db.getData());
        }
    });

    router.post('/', (req, res) => {
        const message = req.body;
        if (message.author === '' || message.message === '') {
            res.status(400).send({"error": "Author and message must be present in the request"})
        } else {
            db.addMessage(message).then(result => {
                res.send(result);
            });
        }
    });

    return router;
};

module.exports = createRouter;