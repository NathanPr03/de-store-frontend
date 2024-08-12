import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {map, Observable, of} from 'rxjs';

export interface ProductReport {
  productName: string;
  amountPurchased: number;
}


export interface SignUps {
  month: string;
  sign_up_count: number;
}

@Injectable({
  providedIn: 'root'
})
export class ReportService {
  private customersUrl = 'https://report-and-anlysis-4clgooasi-nathans-projects-3241c1c3.vercel.app/api/';

  constructor(private http: HttpClient) {}

  getProductReport(): Observable<ProductReport[]> {
    return this.http.get<{ products: ProductReport[] }>(`${this.customersUrl}mostPurchasedItem`)
      .pipe(
        map(response => response.products)
      );
  }

  getMonthlySignUps(): Observable<SignUps[]> {
    return this.http.get<SignUps[]>(`${this.customersUrl}monthlySignUps`)
  }
}
