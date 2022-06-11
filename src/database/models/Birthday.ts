import { Document, model, Schema } from "mongoose";

const BirthdaySchema = new Schema({
  userId: {
    type: String,
    required: true,
    unique: true,
  },
  birthday: {
    type: String,
    required: true,
  },
});

export interface Birthday extends Document {
  userId: string;
  birthday: string;
}

export default model<Birthday>("Birthday", BirthdaySchema);
