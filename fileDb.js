const fs = require('fs');
const nanoid = require("nanoid");

let data = null;


module.exports = {
    init: () => {
        return new Promise((resolve, reject) => {
            fs.readFile('./db.json', (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    data = JSON.parse(result);
                    resolve();
                }
            });
        });
    },
    getData: () => data.slice(-30),
    getDataByDatetime: date => {
        return data.filter(item => {
            if (item.datetime > date) {
                return true;
            }
        });
    },
    addMessage: (message) => {
        message.id = nanoid();
        message.datetime = new Date().toISOString();
        data.push(message);

        let dataStringify = JSON.stringify(data, null, 2);

        return new Promise((resolve, reject) => {
            fs.writeFile('./db.json', dataStringify, err => {
                if (err) {
                    reject(err);
                } else {
                    resolve(message);
                }
            });
        });
    }
};