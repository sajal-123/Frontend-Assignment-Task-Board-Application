import mongoose, { Schema, Model } from "mongoose";
import type { ITask } from "../@types/interface";


const TaskSchema: Schema<ITask> = new Schema({
  columnId: { type: Schema.Types.ObjectId, ref: 'Column', required: true },
  title: { type: String, required: true },
  description: { type: String },
  createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  assignedTo: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  priority: { type: String, enum: ['high', 'medium', 'low'] },
  dueDate: { type: Date },
  order: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
});

const Task: Model<ITask> = mongoose.model<ITask>('Task', TaskSchema);

export default Task;
