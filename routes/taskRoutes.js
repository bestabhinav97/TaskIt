const express = require('express');
const router = express.Router();
const controller = require('./taskController');

router.post('/tasks', controller.addTask);

router.get('/tasks',controller.getTask)

router.delete('/tasks',controller.deleteTask)

router.patch('/tasks/:id/toggle',controller.toggleComplete)

router.put("/tasks",controller.editTask)

module.exports = router;