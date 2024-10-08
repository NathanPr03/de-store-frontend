import { Routes } from '@angular/router';
import {ProductListComponent} from "./product-list/product-list.component";
import {HomeComponent} from "./home/home.component";
import {CustomerManagementComponent} from "./customer-management/customer-management.component";
import {SalesReportComponent} from "./sales-report/sales-report.component";

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'products', component: ProductListComponent },
  { path: 'customers', component: CustomerManagementComponent },
  { path: 'reports', component: SalesReportComponent }
];
