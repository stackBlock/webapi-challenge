const express = require('express');
const router = express.Router();
const db = require('../../data/helpers/actionModel.js');


router.get('/', async (req, res) => {
    await db.get().then(action => {
        res.json({ action })
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
    const { project_id, description, notes, completed } = req.body;
    db.insert({ project_id, description, notes, completed }).then(response => {
        res.status(201).json(response)
    })
        .catch(error => {
            if (error.errno === 19) {
                res.status(400).json({ Error: `There is no project with that ID number` });
                return;
            }
            res.status(400).json({ ErrorMessage: error });
            return;
        });
});

router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { project_id, description, notes } = req.body;
    db.update(id, { project_id, description, notes }).then(response => {
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