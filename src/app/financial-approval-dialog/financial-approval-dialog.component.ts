import { Component, Inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle
} from '@angular/material/dialog';
import {NgClass} from "@angular/common";
import {MatButton} from "@angular/material/button";

@Component({
  selector: 'app-financial-approval-dialog',
  templateUrl: './financial-approval-dialog.component.html',
  standalone: true,
  imports: [
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatDialogTitle,
    NgClass,
    MatButton
  ],
  styleUrls: ['./financial-approval-dialog.component.css']
})
export class FinancialApprovalDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: { email: string, isApproved: boolean }) {}
}
