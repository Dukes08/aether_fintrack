import { IContact } from "../models/contact/IContact";
export declare const getAllContactsService: () => Promise<IContact[]>;
export declare const createContactService: (name: string, email: string, balance: number, operations: string[]) => Promise<IContact>;
export declare const updateContactService: (id: string, name: string) => Promise<IContact>;
