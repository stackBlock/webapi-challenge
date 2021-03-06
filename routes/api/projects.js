const express = require('express');
const router = express.Router();
const db = require('../../data/helpers/projectModel.js');


router.get('/', async (req, res) => {
    await db.get().then(projects => {
        res.json({ projects })
    })
        .catch(error => {
            res.status(500).json({ ErrorMessage: "Something bad has happened" });
            return;
        });
});

router.get('/:id', async (req, res) => {
    await db.get(req.params.id).then(function (data) {
        res.send(data);
    })
        .catch(error => {
            res.status(500).json({ ErrorMessage: "Something bad has happened" });
            return;
        });
});

router.post('/', (req, res) => {
    const { name, description, completed } = req.body;
    db.insert({ name, description, completed }).then(response => {
        res.status(201).json(response);
    })
        .catch(error => {
            res.status(500).json({ ErrorMessage: "Something bad has happened" });
            return;
        });
});

router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { name, description, completed } = req.body;
    db.update(id, { name, description, completed }).then(response => {
        res.status(201).json(response)
    })
        .catch(error => {
            res.status(500).json({ ErrorMessage: "Something bad has happened" });
            return;
        });
});

router.delete('/:id', (req, res) => {
    const id = req.params.id;
    db.remove(id).then(response => {
        res.status(200).json({ Success: `User ${id} is gone forever from the system!!` })
    })
        .catch(error => {
            res.status(500).json({ ErrorMessage: "Something bad has happened" });
            return;
        });
});

module.exports = router;