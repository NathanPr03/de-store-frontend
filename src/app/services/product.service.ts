import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {map, Observable, of} from 'rxjs';
import { catchError } from 'rxjs/operators';

export interface Product {
  id: number;
  name: string;
  price: number;
  discount: string;
  remaining_stock: number;
}

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = 'https://price-control-my0drfxlm-nathans-projects-3241c1c3.vercel.app/api/';

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
