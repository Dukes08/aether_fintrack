import mongoose, { Document } from 'mongoose';
import { IOperation } from '../operations/IOperation';

export interface IContact extends Document {
  email: string;
  name: string;
  balance: number;
  operations: mongoose.Types.ObjectId[];
}
