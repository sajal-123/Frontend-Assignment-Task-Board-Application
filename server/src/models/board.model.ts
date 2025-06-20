import mongoose, { Schema, Model } from "mongoose";
import type { IBoard } from "../@types/interface";

const BoardSchema: Schema<IBoard> = new Schema({
  name: { type: String, required: true },
  createdBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
  createdAt: { type: Date, default: Date.now },
});

const Board: Model<IBoard> = mongoose.model<IBoard>("Board", BoardSchema);

export default Board;
