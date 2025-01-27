import mongoose, { Schema } from 'mongoose';
import { IContact } from '../contact/IContact';

const ContactSchema: Schema = new Schema<IContact>({
  email: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  balance: { type: Number, default: 0 },
  operations: [{ type: mongoose.Types.ObjectId, ref: 'Operation' }],
});

export const Contact = mongoose.model<IContact>('Contact', ContactSchema);
