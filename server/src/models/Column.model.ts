import mongoose, { Schema, Model } from "mongoose";
import type { IColumn } from "../@types/interface";

const ColumnSchema: Schema<IColumn> = new Schema({
  boardId: { type: Schema.Types.ObjectId, ref: "Board", required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  order: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
});

const Column: Model<IColumn> = mongoose.model<IColumn>("Column", ColumnSchema);

export default Column;
