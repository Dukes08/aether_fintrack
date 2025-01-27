import mongoose, { Document } from 'mongoose';
export interface IContact extends Document {
    email: string;
    name: string;
    balance: number;
    operations: mongoose.Types.ObjectId[];
}
