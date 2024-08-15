import { Component, Inject } from '@angular/core';
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialogContent,
  MatDialogActions,
  MatDialogTitle
} from '@angular/material/dialog';
import {FormGroup, FormBuilder, Validators, ReactiveFormsModule} from '@angular/forms';
import {MatFormField, MatInput} from "@angular/material/input";
import {MatButton} from "@angular/material/button";
import {MatLabel} from "@angular/material/form-field";

@Component({
  selector: 'app-add-product-dialog',
  templateUrl: './add-product-dialog.component.html',
  standalone: true,
  imports: [
    MatDialogContent,
    MatDialogActions,
    MatDialogTitle,
    ReactiveFormsModule,
    MatInput,
    MatInput,
    MatButton,
    MatFormField,
    MatLabel
  ],
  styleUrls: ['./add-product-dialog.component.css']
})
export class AddProductDialogComponent {
  addProductForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<AddProductDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.addProductForm = this.fb.group({
      name: ['', Validators.required],
      price: ['', [Validators.required, Validators.min(0)]],
      remaining_stock: ['', [Validators.required, Validators.min(0)]]
    });
  }

  save(): void {
    if (this.addProductForm.valid) {
      this.dialogRef.close(this.addProductForm.value);
    }
  }

  close(): void {
    this.dialogRef.close();
  }
}
