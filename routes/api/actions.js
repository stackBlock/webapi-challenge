const express = require('express');
const router = express.Router();
const db = require('../../data/helpers/actionModel.js');


router.get('/', async (req, res) => {
    await db.get().then(users => {
        res.json({ users })
    });
});

router.get('/:id', async (req, res) => {
    await db.get(req.params.id).then(function (data) {
        res.send(data);
    });
});

router.post('/', (req, res) => {
    const { project_id, description, notes, completed } = req.body;
    db.insert({ project_id, description, notes, completed }).then(response => {
        res.status(201).json(response);
    });
});

router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { project_id, description, notes } = req.body;
    db.update(id, { project_id, description, notes }).then(response => {
        res.status(201).json(response)
    });
});

// router.delete('/:id', (req, res) => {
//     const id = req.params.id;
//     db.remove(id).then(response => {
//         res.status(200).json({ Success: `User ${id} is gone forever from the system!!` })
//     });
// });


module.exports = router;