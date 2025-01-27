import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { ContactService } from '../../services/contact-service.service';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { heroUser } from '@ng-icons/heroicons/outline';
import { ApiResponse2, ContactID, Data } from '../../models/api.module';

@Component({
  selector: 'app-contact-profile',
  imports: [CommonModule, RouterModule, NgIcon],
  templateUrl: './contact-profile.component.html',
  styleUrls: ['./contact-profile.component.css'],
  viewProviders: [provideIcons({ heroUser })],
})
export class ContactProfileComponent implements OnInit {
  contact: ContactID | undefined;
  operations: Data[] = [];
  runningBalance = 0;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private contactService: ContactService
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.contactService.getContactById(id).subscribe(
        (res: ApiResponse2) => {
          console.log(res);
          this.contact = res.data[0]?.contactId;
          this.operations = res.data;
          this.calculateBalance();
        },
        (error) => {
          console.error('Error fetching contact details:', error);
        }
      );
    }
  }

  calculateBalance() {
    this.runningBalance = 0;
    this.operations.forEach((ope) => {
      this.runningBalance += ope.amount;
    });
  }

  goBack() {
    this.router.navigate(['/']);
  }
}
