import { Document, Types } from 'mongoose';

export interface IOperation extends Document {
  contactId: Types.ObjectId;
  amount: number;
  concept: string;
  type: string;
  createdAt: Date;
}
