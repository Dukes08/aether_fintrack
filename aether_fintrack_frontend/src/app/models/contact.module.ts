export interface Contact {
    _id: string;
    email: string;
    name: string;
    balance: number;
    operations: Operation[]
  }

  export interface Operation{
    _id: string,
    contactId: string,
    amount: number,
    concept: string,
    type: string,
    createAt: string;

  }

  export interface CreateContact{
    email: string;
    name: string;
  }
  
  export interface Transaction {
    
    contactId: string;
    amount: number;
    concept: string
    date: Date;
    type: 'income' | 'expense';
  }