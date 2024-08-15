import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {map, Observable, of} from 'rxjs';
import { catchError } from 'rxjs/operators';
import {addWarning} from "@angular-devkit/build-angular/src/utils/webpack-diagnostics";

export interface Product {
  id: number;
  name: string;
  price: number;
  discount: string;
  remainingStock: number;
  showDiscountDropdown: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = 'https://price-control-5btbdkja9-nathans-projects-3241c1c3.vercel.app/api/';

  constructor(private http: HttpClient) {}

  getProducts(): Observable<Product[]> {
    return this.http.get<{ products: Product[] }>(`${this.apiUrl}products`).pipe(
      map(response => response.products)
    );
  }

  updateProduct(product: Product): Observable<any> {
    const body = {
      productName: product.name,
      price: product.price,
    }

    const url = `${this.apiUrl}productPrice`;
    console.log("Body is: " + JSON.stringify(body));
    return this.http.post(url, JSON.stringify(body), this.httpOptions).pipe(
      catchError(this.handleError<any>('updateProduct'))
    );
  }

  addProduct(product: Product): Observable<any> {
    const url = `${this.apiUrl}product`;
    return this.http.post(url, JSON.stringify(product), this.httpOptions).pipe(
      catchError(this.handleError<any>('addProduct'))
    )
  }

  updateDiscount(productName: string, discount: string | null): Observable<any> {
    const url = `${this.apiUrl}productDiscount`;
    const body = {
      productName: productName,
      discountType: discount,
    }
    return this.http.post(url, body, this.httpOptions).pipe(
      catchError(this.handleError<any>('updateDiscount'))
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
