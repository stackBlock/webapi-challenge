const express = require('express');
const router = express.Router();
const db = require('../../data/helpers/projectModel.js');


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


module.exports = router;