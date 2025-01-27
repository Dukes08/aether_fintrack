import mongoose from 'mongoose';
import { IOperation } from '../operations/IOperation';
export declare const Operation: mongoose.Model<IOperation, {}, {}, {}, mongoose.Document<unknown, {}, IOperation> & IOperation & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>;
