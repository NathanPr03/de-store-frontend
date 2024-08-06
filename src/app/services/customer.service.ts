import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {map, Observable, of} from 'rxjs';
import { catchError } from 'rxjs/operators';

export interface Customer {
  id: number;
  email: string;
  has_loyalty_card: boolean;
  favorite_item: string;
  financial_approval?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  private customersUrl = 'https://loyalty-card-ax0v2gizs-nathans-projects-3241c1c3.vercel.app/api/';

  constructor(private http: HttpClient) {}

  getCustomers(): Observable<Customer[]> {
    return this.http.get<Customer[]>(`${this.customersUrl}customers`).pipe(
      catchError(this.handleError<Customer[]>('getCustomers', []))
    );
  }

  updateLoyaltyCard(customerId: number, shouldHaveLoyaltyCard: boolean): Observable<any> {
    const url = `${this.customersUrl}loyaltyCard`;
    const body = {
      customerID: customerId.toString(),
      loyaltyCard: shouldHaveLoyaltyCard
    }
    return this.http.post(url, body, this.httpOptions).pipe(
      catchError(this.handleError<any>('updateLoyaltyCard'))
    );
  }

  checkFinancialApproval(customerId: number): Observable<boolean> {
    const url = `https://finance-approval-ho4kbfm9z-nathans-projects-3241c1c3.vercel.app/api/finance?customer_id=${customerId}`;
    return this.http.get<{ eligible: boolean }>(url).pipe(
      map(response => response.eligible),
      catchError(this.handleError<boolean>('checkFinancialApproval', false))
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
