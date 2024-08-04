import { Component, Inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from '@angular/material/dialog';
import {MatListOption, MatSelectionList} from "@angular/material/list";
import {NgForOf} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {MatButton} from "@angular/material/button";

@Component({
  selector: 'app-discount-dialog',
  templateUrl: './discount-dialog.component.html',
  standalone: true,
  imports: [
    MatDialogContent,
    MatDialogActions,
    MatSelectionList,
    MatListOption,
    MatDialogTitle,
    NgForOf,
    FormsModule,
    MatButton,
    MatButton,
    MatButton
  ],
  styleUrls: ['./discount-dialog.component.css']
})
export class DiscountDialogComponent {
  availableDiscounts: string[] = [
    'No Discount',
    '10% off',
    '20% off',
    'Buy 1 Get 1 Free',
    '2-for-1'
  ];

  selectedDiscounts: string[];

  constructor(
    public dialogRef: MatDialogRef<DiscountDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { currentDiscount: string }
  ) {
    this.selectedDiscounts = data.currentDiscount ? [data.currentDiscount] : [];
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    this.dialogRef.close(this.selectedDiscounts);
  }
}
