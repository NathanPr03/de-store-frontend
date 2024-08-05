import { Component } from '@angular/core';
import {RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';
import {ProductListComponent} from "./product-list/product-list.component";
import {MatIcon} from "@angular/material/icon";
import {MatListItem, MatNavList} from "@angular/material/list";
import {MatSidenav, MatSidenavContainer, MatSidenavContent} from "@angular/material/sidenav";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: true,
  styleUrl: './app.component.css',
  imports: [ProductListComponent, RouterOutlet, MatIcon, MatIcon, MatNavList, MatSidenav, MatSidenavContent, MatSidenavContainer, RouterLink, RouterLinkActive, RouterLinkActive, RouterLink, MatListItem, MatListItem]
})
export class AppComponent {
  title = 'de-store-frontnd';
}
