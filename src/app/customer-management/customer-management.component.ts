import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import {Customer, CustomerService} from '../services/customer.service';
import {MatCard} from "@angular/material/card";
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow, MatHeaderRowDef, MatRow, MatRowDef, MatTable
} from "@angular/material/table";
import {MatIcon} from "@angular/material/icon";
import {MatMenu, MatMenuItem, MatMenuTrigger} from "@angular/material/menu";
import {MatIconButton} from "@angular/material/button";
import {FinancialApprovalDialogComponent} from "../financial-approval-dialog/financial-approval-dialog.component";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-customer-management',
  templateUrl: './customer-management.component.html',
  standalone: true,
  imports: [
    MatCard,
    MatColumnDef,
    MatHeaderRow,
    MatColumnDef,
    MatCell,
    MatCellDef,
    MatHeaderCellDef,
    MatHeaderCell,
    MatHeaderCell,
    MatColumnDef,
    MatCellDef,
    MatCellDef,
    MatRow,
    MatHeaderCell,
    MatHeaderRowDef,
    MatRowDef,
    MatTable,
    MatIcon,
    MatMenu,
    MatIcon,
    MatMenuTrigger,
    MatMenuItem,
    MatIconButton
  ],
  styleUrls: ['./customer-management.component.css']
})
export class CustomerManagementComponent implements OnInit {
  customers: Customer[] = [];

  constructor(
    private customerService: CustomerService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.fetchCustomers();
  }

  fetchCustomers(): void {
    this.customerService.getCustomers().subscribe(
      (data: Customer[]) => {
        this.customers = data;
        console.log('Fetched customers:', this.customers);
      },
      (error) => {
        console.error('Error fetching customers', error);
        this.snackBar.open('Error fetching customers', 'Close', { duration: 3000 });
      }
    );
  }

  toggleLoyaltyCard(customer: Customer): void {
    customer.has_loyalty_card = !customer.has_loyalty_card;
    this.customerService.updateLoyaltyCard(customer.id, customer.has_loyalty_card).subscribe(
      () => {
        const action = customer.has_loyalty_card ? 'set' : 'removed';
        this.snackBar.open(`Loyalty card ${action} for ${customer.email}`, 'Close', { duration: 3000 });
      },
      (error) => {
        console.error('Error updating loyalty card', error);
        this.snackBar.open('Error updating loyalty card', 'Close', { duration: 3000 });
      }
    );
  }

  checkFinancialApproval(customer: Customer): void {
    this.customerService.checkFinancialApproval(customer.id).subscribe(
      (isApproved: boolean) => {
        // Open the dialog with the financial approval status
        this.dialog.open(FinancialApprovalDialogComponent, {
          width: '400px',
          data: { email: customer.email, isApproved: isApproved }
        });
      },
      (error) => {
        console.error('Error checking financial approval', error);
        this.snackBar.open('Error checking financial approval', 'Close', { duration: 3000 });
      }
    );
  }
}
