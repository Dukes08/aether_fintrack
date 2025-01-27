import mongoose, { Schema } from 'mongoose';
import { IOperation } from '../operations/IOperation';

const OperationSchema: Schema = new Schema<IOperation>({
    contactId: { type: Schema.Types.ObjectId, ref: 'Contact', required: true },
    amount: { type: Number, required: true },
    concept: { type: String, required: true },
    type: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
  });
  

export const Operation = mongoose.model<IOperation>('Operation', OperationSchema);
