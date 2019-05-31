const express = require('express');
const router = express.Router();
const db = require('../../data/helpers/actionModel.js');


router.get('/', async (req, res) => {
    await db.get().then(users => {
        res.json({ users })
    });
});




module.exports = router;