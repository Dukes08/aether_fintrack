import { Routes } from '@angular/router';
import { ContactListComponent } from './components/contact-list/contact-list.component';
import { ContactProfileComponent } from './components/contact-profile/contact-profile.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'contact-list',
    pathMatch: 'full',
  },
  {
    path: 'contact-list',
    component: ContactListComponent,
  },
  {
    path: 'contact-profile/:id',
    component: ContactProfileComponent,
  },
];

