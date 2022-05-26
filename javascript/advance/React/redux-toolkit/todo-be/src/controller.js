const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const uuidv1 = require('uuid/v1');

const adapter = new FileSync('data/db.json');
const db = low(adapter);

exports.getAll = (req, res) => {
    setTimeout(() => {
        const posts = db.get('todos')
            .sortBy('createdDate')
            .reverse()
            .value();
        res.send(posts);
    }, 3000);
};

exports.getCompleted = (req, res) => {
    const posts = db.get('todos')
        .filter((item) => item.completed)
        .sortBy('createdDate')
        .reverse()
        .value();
    res.send(posts);
};

exports.create = (req, res) => {
    if (!req.body.text) {
        res.status(422).send('\'text\' field must be present in json');
    } else {
        const written = db.get('todos')
            .push({
                id: uuidv1(),
                text: req.body.text,
                completed: false,
                createdDate: new Date().getTime(),
            })
            .last()
            .write();
        res.send(written);
    }
};

exports.delete = (req, res) => {
    const id = req.param('id');
    if (!id) {
        res.status(422).send('\'id\' must be present in params');
    } else {
        const deleted = db.get('todos')
            .remove({id})
            .write();
        if (deleted.length === 0) {
            res.status(404).send('id not found, nothing to delete');
        } else {
            res.send();
        }
    }
};

exports.updateText = (req, res) => {
    const {text} = req.body;
    const id = req.param('id');
    if (!text) {
        res.status(422).send('\'text\' field must be present in json');
    } else if (!id) {
        res.status(422).send('\'id\' must be present in params');
    } else {
        const written = db.get('todos')
            .find({id})
            .assign({text})
            .write();
        res.send(written);
    }
};

exports.complete = (req, res) => {
    const id = req.param('id');
    if (!id) {
        res.status(422).send('\'id\' must be present in params');
    } else {
        const completed = db.get('todos')
            .find({
                id,
                completed: false,
            })
            .assign({
                completed: true,
                completedDate: new Date().getTime(),
            })
            .write();
        if (!completed.id) {
            res.status(404).send('id not found or trying to complete already completed item');
        } else {
            res.send(completed);
        }
    }
};

exports.incomplete = (req, res) => {
    const id = req.param('id');
    if (!id) {
        res.status(422).send('\'id\' must be present in params');
    } else {
        const incompleted = db.get('todos')
            .find({
                id,
                completed: true,
            })
            .assign({
                completed: false,
                completedDate: undefined,
            })
            .write();
        if (!incompleted.id) {
            res.status(404).send('id not found or trying to incomplete not completed item');
        } else {
            res.send(incompleted);
        }
    }
};

