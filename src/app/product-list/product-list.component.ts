import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import {Product, ProductService} from '../services/product.service';
import {MatIcon} from "@angular/material/icon";
import {MatMenu, MatMenuItem, MatMenuTrigger} from "@angular/material/menu";
import {FormsModule} from "@angular/forms";
import {MatOption} from "@angular/material/core";
import {CurrencyPipe, NgForOf} from "@angular/common";
import {MatIconButton} from "@angular/material/button";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef, MatHeaderRow, MatHeaderRowDef,
  MatRow, MatRowDef,
  MatTable
} from "@angular/material/table";
import {MatSort} from "@angular/material/sort";
import {MatCard} from "@angular/material/card";
import {MatSelect} from "@angular/material/select";

@Component({
  imports: [
    MatIcon,
    MatMenu,
    MatMenuTrigger,
    FormsModule,
    MatOption,
    NgForOf,
    MatIconButton,
    MatFormField,
    MatMenuItem,
    MatHeaderCell,
    MatColumnDef,
    MatCell,
    MatHeaderCell,
    MatHeaderCellDef,
    MatCell,
    MatHeaderCell,
    MatTable,
    MatCell,
    MatCell,
    MatColumnDef,
    MatLabel,
    MatColumnDef,
    MatHeaderCell,
    MatSort,
    MatCellDef,
    MatCellDef,
    MatHeaderCellDef,
    MatRow,
    MatColumnDef,
    MatTable,
    MatRowDef,
    MatCellDef,
    MatHeaderRow,
    MatHeaderRowDef,
    MatHeaderCellDef,
    MatHeaderCellDef,
    MatCellDef,
    MatCard,
    MatSelect,
    CurrencyPipe
  ],
  selector: 'app-product-list',
  standalone: true,
  styleUrls: ['./product-list.component.css'],
  templateUrl: './product-list.component.html'
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  offers: string[] = ['None', '3 for 2', 'Buy One Get One Free', 'Free Delivery'];

  constructor(private productService: ProductService, private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.fetchProducts();
  }

  fetchProducts(): void {
    this.productService.getProducts().subscribe(
      (data: Product[]) => {
        this.products = data
      },
      (error) => {
        console.error('Error fetching products', error);
        this.snackBar.open('Error fetching products', 'Close', { duration: 3000 });
      }
    );
  }

  changePrice(product: Product): void {
    const newPrice = prompt(`Enter a new price for ${product.name}:`, product.price.toString());
    if (newPrice) {
      const price = parseFloat(newPrice);
      if (!isNaN(price)) {
        product.price = price;
        this.productService.updateProduct(product).subscribe(
          () => {
            this.snackBar.open('Price updated successfully', 'Close', { duration: 3000 });
          },
          (error) => {
            console.error('Error updating product', error);
            this.snackBar.open('Error updating product', 'Close', { duration: 3000 });
          }
        );
      } else {
        this.snackBar.open('Invalid price entered', 'Close', { duration: 3000 });
      }
    }
  }
}
