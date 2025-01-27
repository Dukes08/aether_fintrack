import mongoose from 'mongoose';
import { IContact } from '../contact/IContact';
export declare const Contact: mongoose.Model<IContact, {}, {}, {}, mongoose.Document<unknown, {}, IContact> & IContact & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>;
