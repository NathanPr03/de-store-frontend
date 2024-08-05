import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {map, Observable, of} from 'rxjs';
import { catchError } from 'rxjs/operators';
import {Product} from "./product.service";

@Injectable({
  providedIn: 'root'
})
export class InventoryService {
  private inventoryUrl = 'https://inventory-control-craaan9aw-nathans-projects-3241c1c3.vercel.app/api/';

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

  updateInventory(product: Product, additionalStock: number): Observable<any> {
    const url = `${this.inventoryUrl}changeStock?productName=${product.name}`;
    const body = {
      newStock: product.remainingStock + additionalStock
    }
    return this.http.post(url, body, this.httpOptions).pipe(
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
