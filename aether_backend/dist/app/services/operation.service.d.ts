import { IOperation } from "../models/operations/IOperation";
export declare const getAllOperationsService: () => Promise<IOperation[]>;
export declare const createOperationService: (contactId: string, amount: number, concept: string, type: string) => Promise<IOperation>;
export declare const getOperationsService: (contactId: string) => Promise<IOperation[]>;
