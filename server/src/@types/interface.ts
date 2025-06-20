import type mongoose from "mongoose";
import type { Document } from "mongoose";

export interface IUser extends Document {
  username: string;
  email: string;
  avatar: string;
  password: string;
  refreshToken?: string;
  isPasswordCorrect(password: string): Promise<boolean>;
  generateAccessToken(): string;
  generateRefreshToken(): string;
}

export interface IColumn extends Document {
  boardId: mongoose.Types.ObjectId;
  title: string;
  description: string;
  order: number;
  createdAt: Date;
}

export interface IBoard extends Document {
  name: string;
  createdBy: mongoose.Types.ObjectId;
  createdAt: Date;
}



export interface ITask extends Document {
  columnId: mongoose.Types.ObjectId;
  title: string;
  description?: string;
  createdBy: mongoose.Types.ObjectId;
  assignedTo: mongoose.Types.ObjectId[];
  priority?: 'high' | 'medium' | 'low';
  dueDate?: Date;
  order: number;
  createdAt: Date;
}
