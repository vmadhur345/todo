import { Router } from 'express';
const router = Router();
import { createTask, getAllTasks, getTaskById, updateTaskStatus, deleteTask } from '../controllers/taskController.js';

// Route definitions
router.post('/tasks', createTask);
router.get('/tasks', getAllTasks);
router.get('/tasks/:id', getTaskById);
router.put('/tasks/:id', updateTaskStatus);
router.delete('/tasks/:id', deleteTask);

export default router;
