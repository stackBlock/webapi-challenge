const express = require('express');
const router = express.Router();
const actionsRoute = require('./actions');
const projectsRoute = require('./projects');

router.use('/actions', actionsRoute);
router.use('/projects', projectsRoute);

module.exports = router;