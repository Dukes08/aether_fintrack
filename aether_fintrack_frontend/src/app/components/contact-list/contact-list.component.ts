import { Component, Inject, inject, OnInit } from '@angular/core';
import { ModalComponent } from '../modal/modal.component'; // Import the modal
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import {
  Contact,
  CreateContact,
  Transaction,
} from '../../models/contact.module';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { ContactService } from '../../services/contact-service.service';
import { heroUser } from '@ng-icons/heroicons/outline';
import { ModalField } from '../../models/modal.field.module';
import { HttpClient } from '@angular/common/http';
import { ApiResponse } from '../../models/api.module';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css'],
  imports: [CommonModule, ModalComponent, RouterModule, NgIcon],
  viewProviders: [provideIcons({ heroUser })],
})
export class ContactListComponent implements OnInit {
  contacts: Contact[] = [];
  showCreateModal = false;
  showEditBalanceModal = false;
  showEditNameModal = false;
  http = Inject(HttpClient);
  createModalFields: ModalField[] = [];
  editModalFields: ModalField[] = [];
  editContactNameField: ModalField[] = [];
  contactToEdit: Contact | null = null;
  contactService = inject(ContactService);

  ngOnInit(): void {
    this.contactService.getContacts().subscribe(
      (contacts: Contact[]) => {
        this.contacts = contacts;
      },
      (error) => {
        console.error('Error loading contacts:', error);
      }
    );
  }

  closeCreateModal() {
    this.showCreateModal = false;
  }

  closeEditBalanceModal() {
    this.showEditBalanceModal = false;
  }

  closeEditNameModal() {
    this.showEditNameModal = false;
  }

  openCreateContactModal() {
    this.createModalFields = [
      { label: 'Email', name: 'email', type: 'email', required: true },
      { label: 'Name', name: 'name', type: 'text', required: true },
    ];
    this.showCreateModal = true;
  }

  openEditBalanceModal(contact: Contact) {
    this.contactToEdit = contact;
    console.log(this.contactToEdit);
    this.editModalFields = [
      {
        label: 'Amount',
        name: 'balance',
        type: 'number',
        required: true,
        minValue: 0,
      },
      {
        label: 'Type',
        name: 'transaction type',
        type: 'select',
        required: true,
        minValue: 0,
        options: [
          { value: 'income', label: 'Income' },
          { value: 'expense', label: 'Expense' },
        ],
      },
      {
        label: 'Concept',
        name: 'concept',
        type: 'string',
        required: true,
        minValue: 0,
      },
    ];
    this.showEditBalanceModal = true;
  }

  openEditContactName(contact: Contact) {
    this.contactToEdit = contact;
    this.editContactNameField = [
      { label: 'New Name', name: 'name', type: 'text', required: true },
    ];
    this.showEditNameModal = true;
  }

  handleCreateContact(data: { [key: string]: string }) {
    const newContact: CreateContact = {
      email: data['email'],
      name: data['name'],
    };

    this.contactService.addContact(newContact).subscribe(
      (contact: Contact) => {
        console.log('Nuevo contacto creado:', contact);
        this.contactService.getContacts().subscribe(
          (contacts: Contact[]) => {
            this.contacts = contacts;
          },
          (error) => {
            console.error('Error al recargar los contactos:', error);
          }
        );
        this.closeCreateModal();
      },
      (error) => {
        console.error('Error al crear el contacto:', error);
        this.closeCreateModal();
      }
    );
  }

  handleEditBalance(data: { [key: string]: string }) {
    const balance = +data['balance'];
    const transactionType = data['transaction type'].trim();
    const concept = data['concept'].trim();
    console.log('contacto a editar', this.contactToEdit);

    if (
      !transactionType ||
      !concept ||
      isNaN(balance) ||
      !['income', 'expense'].includes(transactionType)
    ) {
      console.error(
        'Missing or invalid input for balance, transaction type, or concept'
      );
      return;
    }

    const updatedBalance: Transaction = {
      contactId: this.contactToEdit!._id,
      amount: balance,
      concept,
      date: new Date(),
      type: transactionType as 'income' | 'expense',
    };

    this.contactService
      .updateBalance(this.contactToEdit!._id, updatedBalance)
      .subscribe(
        (updatedTransaction) => {
          this.contactToEdit!.balance += updatedTransaction.amount;
          console.log('Balance updated successfully', updatedTransaction);

          this.contactService.getContacts().subscribe(
            (contacts: Contact[]) => {
              this.contacts = contacts;
            },
            (error) => {
              console.error('Error reloading contacts:', error);
            }
          );
        },
        (error) => {
          console.error('Error updating balance:', error);
        }
      );

    this.closeEditBalanceModal();
  }

  handleNameEditing(data: { [key: string]: string }) {
    if (this.contactToEdit) {
      const newName = data['name'];
      const contactId = this.contactToEdit._id;

      this.contactService.updateContactName(contactId, newName).subscribe(
        (updatedContact) => {
          console.log('Contact name updated successfully:', updatedContact);

          this.contactService.getContacts().subscribe(
            (contacts: Contact[]) => {
              this.contacts = contacts;
            },
            (error) => {
              console.error(
                'Error reloading contacts after name update:',
                error
              );
            }
          );

          this.closeEditNameModal();
        },
        (error) => {
          console.error('Error updating contact name:', error);
        }
      );
    }
  }
}
