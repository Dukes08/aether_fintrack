import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ModalField } from '../../models/modal.field.module';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent {
  
  @Input() fields: ModalField[] = [];
  @Output() create = new EventEmitter<{ [key: string]: string }>();
  @Output() close = new EventEmitter();
  formData: { [key: string]: string } = {};
  showDialog = true;

  onSubmit() {
    if (this.isValid()) {
      this.create.emit(this.formData);
      this.resetForm();
    }
  }

  onCancel() {
    this.close.emit();
  }

  private resetForm() {
    this.formData = {};
  }

  private isValid(): boolean {
    return this.fields.every(field => {
      if (field.required && !this.formData[field.name]) {
        return false;
      }
      if (field.minValue && this.formData[field.name]?.length < field.minValue) {
        return false;
      }
      return true;
    });
  }
}
