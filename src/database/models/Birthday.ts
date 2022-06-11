import { Document, model, Schema } from "mongoose";

const BirthdaySchema = new Schema({
  userId: {
    type: String,
    required: true,
    unique: true,
  },
  birthday: {
    type: Number,
    required: true,
  },
});

export interface Birthday extends Document {
  userId: string;
  birthday: number;
}

export default model<Birthday>("Birthday", BirthdaySchema);
