import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { ProductListComponent } from '../../pages/admin/products/list/list.component';
import { NgToastModule } from 'ng-angular-popup';
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
  selector: 'app-admin-layout',
  standalone: true,
  imports: [
    RouterOutlet,
    SidebarComponent,
    RouterLink,
    ProductListComponent,
    NgToastModule,
    NgxPaginationModule,
  ],
  templateUrl: './admin-layout.component.html',
  styleUrl: './admin-layout.component.css',
})
export class AdminLayoutComponent {}
