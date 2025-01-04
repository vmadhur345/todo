import { Schema, model } from 'mongoose';

const TaskSchema = new Schema({
  title: {
    type: String,
    required: [true, 'Task title is required'],
  },
  description: {
    type: String,
    required: [true, 'Task description is required'],
  },
  status: {
    type: String,
    enum: ['pending', 'in-progress', 'completed'],
    default: 'pending',
  },
}, {
  timestamps: true, // Automatically manage createdAt and updatedAt fields
});

export default model('Task', TaskSchema);
