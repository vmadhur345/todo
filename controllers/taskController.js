import Task from '../models/Task.js';
import { Types } from 'mongoose';

// Create a new task
export async function createTask(req, res) {
  try {
    const { title, description } = req.body;
    const task = new Task({ title, description });
    await task.save();
    res.status(201).json(task);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// Fetch all tasks
export async function getAllTasks(req, res) {
  try {
    const tasks = await find();
    res.status(200).json(tasks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export async function getTaskById(req, res) {
  try {
    const taskId = req.params.id;

    // Check if the taskId is a valid ObjectId
    if (!Types.ObjectId.isValid(taskId)) {
      return res.status(400).json({ error: 'Invalid Task ID' });
    }

    const task = await findById(taskId);
    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }
    res.status(200).json(task);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// Update task status
export async function updateTaskStatus(req, res) {
  try {
    const { status } = req.body;
    const task = await findById(req.params.id);
    if (!task) return res.status(404).json({ error: 'Task not found' });

    task.status = status;
    await task.save();
    res.status(200).json(task);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// Delete a task
export async function deleteTask(req, res) {
  try {
    const task = await findByIdAndDelete(req.params.id);
    if (!task) return res.status(404).json({ error: 'Task not found' });
    res.status(200).json({ message: 'Task deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
