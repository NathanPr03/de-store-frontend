import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {map, Observable, of} from 'rxjs';
import { catchError } from 'rxjs/operators';
import {Product} from "./product.service";

@Injectable({
  providedIn: 'root'
})
export class InventoryService {
  private inventoryUrl = 'https://inventory-control-oxb6guc4z-nathans-projects-3241c1c3.vercel.app/api/'; // Replace with your actual inventory endpoint

  constructor(private http: HttpClient) {}

  getLowStockItems(threshold: number = 5): Observable<Product[]> {
    return this.http.get<{ products: any }>(`${this.inventoryUrl}lowStockProducts`).pipe(
      map(response => response.products.map((product: { remainingStock: any; productName: any;}) => ({
        ...product,
        name: product.productName,
        remaining_stock: product.remainingStock
      })))
    );
  }

  updateInventory(product: Product): Observable<any> {
    const url = `${this.inventoryUrl}/${product.id}`;
    return this.http.put(url, product, this.httpOptions).pipe(
      catchError(this.handleError<any>('updateInventory'))
    );
  }

  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}
