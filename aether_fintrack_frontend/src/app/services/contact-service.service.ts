import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Contact, CreateContact, Transaction } from '../models/contact.module';
import { ApiResponse, ApiResponse2 } from '../models/api.module';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getContacts(): Observable<Contact[]> {
    return this.http.get<ApiResponse>(`${this.apiUrl}/v1/contacts`).pipe(
      map((response: ApiResponse) => response.data) 
    );
  }
  addContact(newContact: CreateContact): Observable<Contact> {
    return this.http.post<Contact>(`${this.apiUrl}/v1/contact`, newContact);
  }

  
  updateBalance(
    contactId: string,
    amount: Transaction
  ): Observable<Transaction> {
    const url = `${this.apiUrl}/v1/operation`;
    return this.http.post<Transaction>(url, amount);
  }

  updateContactName(contactId: string, name: string): Observable<Contact> {
    const url = `${this.apiUrl}/v1/contact/${contactId}`; 
    const body = { name };

    return this.http.put<Contact>(url, body);
  }

  
  getContactById(contactId: string): Observable<ApiResponse2> {
    const url = `${this.apiUrl}/v1/operations/contact/${contactId}`;
    return this.http.get<ApiResponse2>(url);
  }
}
