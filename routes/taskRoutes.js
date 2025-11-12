const express = require('express');
const router = express.Router();
const controller = require('./taskController');

router.post('/tasks', controller.addTask);

module.exports = router;