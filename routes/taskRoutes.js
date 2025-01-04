const express = require('express');
const router = express.Router();
const {
  createTask,
  getAllTasks,
  getTaskById,
  updateTaskStatus,
  deleteTask,
} = require('../controllers/taskController');

// Route definitions
router.post('/tasks', createTask);
router.get('/tasks', getAllTasks);
router.get('/tasks/:id', getTaskById);
router.put('/tasks/:id', updateTaskStatus);
router.delete('/tasks/:id', deleteTask);

module.exports = router;
