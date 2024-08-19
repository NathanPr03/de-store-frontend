import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import {Product, ProductService} from '../services/product.service';
import {MatIcon} from "@angular/material/icon";
import {MatMenu, MatMenuItem, MatMenuTrigger} from "@angular/material/menu";
import {FormsModule} from "@angular/forms";
import {MatOption} from "@angular/material/core";
import {CommonModule, CurrencyPipe, NgForOf} from "@angular/common";
import {MatButton, MatIconButton} from "@angular/material/button";
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
import {MatDialog, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogTitle} from "@angular/material/dialog";
import {DiscountDialogComponent} from "../discount-dialog/discount-dialog.component";
import {MatTab, MatTabGroup} from "@angular/material/tabs";
import {InventoryService} from "../services/inventory.service";
import {OrderDialogComponent} from "../order-dialog/order-dialog.component";
import {AddProductDialogComponent} from "../add-product-dialog/add-product-dialog.component";
import {MatSlideToggle} from "@angular/material/slide-toggle";

@Component({
  imports: [
    CommonModule,
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
    CurrencyPipe,
    MatDialogActions,
    MatDialogContent,
    MatDialogTitle,
    MatButton,
    MatButton,
    MatButton,
    MatDialogClose,
    DiscountDialogComponent,
    MatTabGroup,
    MatTab,
    OrderDialogComponent,
    MatSlideToggle
  ],
  selector: 'app-product-list',
  standalone: true,
  styleUrls: ['./product-list.component.css'],
  templateUrl: './product-list.component.html'
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  discountedProducts: Product[] = [];
  lowStockProducts: Product[] = [];
  showOnlyDiscounted = false;

  constructor(private productService: ProductService, private snackBar: MatSnackBar, private dialog: MatDialog, private inventoryService: InventoryService) {}

  ngOnInit(): void {
    this.fetchProducts();
    this.fetchLowStockProducts();
  }

  fetchProducts(): void {
    this.productService.getProducts().subscribe(
      (data: Product[]) => {
        this.products = data.map(product => ({ ...product, showDiscountDropdown: false }));
        this.discountedProducts = this.products;
        console.log('Fetched products:', this.products);
      },
      (error) => {
        console.error('Error fetching products', error);
        this.snackBar.open('Error fetching products', 'Close', { duration: 3000 });
      }
    );
  }

  fetchLowStockProducts(): void {
    console.log("FETCHING")
    this.inventoryService.getLowStockItems().subscribe(
      (data: Product[]) => {
        this.lowStockProducts = data;
        console.log('Fetched low stock products:', this.lowStockProducts);
      },
      (error) => {
        console.error('Error fetching low stock items', error);
        this.snackBar.open('Error fetching low stock items', 'Close', { duration: 3000 });
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

  openDiscountDialog(product: Product): void {
    const dialogRef = this.dialog.open(DiscountDialogComponent, {
      width: '400px',
      data: { currentDiscount: product.discount }
    });

    dialogRef.afterClosed().subscribe(selectedDiscounts => {
      if (selectedDiscounts) {
        this.setDiscount(product, selectedDiscounts[0]); // Assuming one discount is selected for simplicity
      }
    });
  }

  setDiscount(product: Product, discount: string): void {
    this.productService.updateDiscount(product.name, discount === 'No Discount' ? null : discount).subscribe(
      () => {
        this.snackBar.open('Discount updated successfully', 'Close', { duration: 3000 });
        product.discount = discount; // Update local model to reflect change
      },
      (error) => {
        console.error('Error updating discount', error);
        this.snackBar.open('Error updating discount', 'Close', { duration: 3000 });
      }
    );
  }

  openAddProductDialog(): void {
    const dialogRef = this.dialog.open(AddProductDialogComponent, {
      width: '400px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.addProduct(result);
      }
    });
  }

  addProduct(productData: Product): void {
    this.productService.addProduct(productData).subscribe(
      () => {
        this.snackBar.open('Product added successfully', 'Close', { duration: 3000 });
        this.fetchProducts(); // Refresh the product list
      },
      (error) => {
        console.error('Error adding product', error);
        this.snackBar.open('Error adding product', 'Close', { duration: 3000 });
      }
    );
  }

  toggleDiscountFilter(showOnlyDiscounted: boolean): void {
    this.showOnlyDiscounted = showOnlyDiscounted;
    this.applyFilter();
  }

  applyFilter(): void {
    if (this.showOnlyDiscounted) {
      this.discountedProducts = this.products.filter(product => product.discount && product.discount !== 'No Discount');
    } else {
      this.discountedProducts = [...this.products];
    }
  }


  orderMore(product: Product): void {
    const dialogRef = this.dialog.open(OrderDialogComponent, {
      width: '300px',
      data: { productName: product.name }
    });

    dialogRef.afterClosed().subscribe(quantity => {
      if (quantity) {
        this.inventoryService.updateInventory(product, quantity).subscribe(
          (response) => {
            this.snackBar.open(`Ordered ${quantity} more of ${product.name}`, 'Close', { duration: 3000 });
            console.log('Order response:', response);
          },
          (error) => {
            console.error('Error ordering more stock', error);
            this.snackBar.open('Error ordering more stock', 'Close', { duration: 3000 });
          }
        );
      }
    })
  }
}
