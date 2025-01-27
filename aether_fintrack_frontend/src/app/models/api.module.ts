import { Contact } from "./contact.module";

export interface ApiResponse {
    status: string;
    message: string;
    data: Contact[]
  }

  export interface ApiResponse2 {
    status:  string;
    message: string;
    data:    Data[];
}

export interface Data {
  _id:       string;
  contactId: ContactID;
  amount:    number;
  concept:   string;
  type:      string;
  createdAt: Date;
  __v:       number;
}

export interface ContactID {
  _id:        string;
  email:      string;
  name:       string;
  balance:    number;
  operations: string[];
  __v:        number;
}