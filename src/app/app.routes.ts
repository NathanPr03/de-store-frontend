import { Routes } from '@angular/router';
import {ProductListComponent} from "./product-list/product-list.component";
import {HomeComponent} from "./home/home.component";

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' }, // Redirect to home by default
  { path: 'home', component: HomeComponent },
  { path: 'products', component: ProductListComponent },
];
