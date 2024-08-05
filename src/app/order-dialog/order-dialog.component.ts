import { Component, Inject } from '@angular/core';
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialogContent,
  MatDialogActions,
  MatDialogTitle
} from '@angular/material/dialog';
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {FormsModule} from "@angular/forms";
import {MatButton} from "@angular/material/button";
import {MatInput} from "@angular/material/input";

@Component({
  selector: 'app-order-dialog',
  templateUrl: './order-dialog.component.html',
  standalone: true,
  imports: [
    MatDialogContent,
    MatDialogActions,
    MatFormField,
    MatLabel,
    MatDialogTitle,
    FormsModule,
    MatButton,
    MatButton,
    MatButton,
    MatInput
  ],
  styleUrls: ['./order-dialog.component.css']
})
export class OrderDialogComponent {
  quantity: number = 1; // Default quantity

  constructor(
    public dialogRef: MatDialogRef<OrderDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { productName: string }
  ) {}

  onCancel(): void {
    this.dialogRef.close();
  }

  onOrder(): void {
    this.dialogRef.close(this.quantity);
  }
}
