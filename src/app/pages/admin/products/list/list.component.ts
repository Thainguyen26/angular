import { NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { Products } from '../../../../types/products';
import { ProductService } from '../../../../service/product.service';
import { HttpClientModule } from '@angular/common/http';
import { NgToastModule, NgToastService } from 'ng-angular-popup';
import { NgxPaginationModule } from 'ngx-pagination';
import { SidebarComponent } from '../../../../components/sidebar/sidebar.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [
    RouterOutlet,
    NgFor,
    HttpClientModule,
    NgToastModule,
    NgxPaginationModule,
    RouterLink,
    SidebarComponent,
    // BrowserAnimationsModule,
  ],
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
  providers: [ProductService],
})
export class ProductListComponent implements OnInit {
  currentPage: number = 1;
  products: Array<Products> = new Array<Products>();

  constructor(private bn: ProductService, private toast: NgToastService) {}

  getAll() {
    this.bn.getProducts(10).subscribe({
      next: (products) => {
        this.products = products;
        this.toast.success({
          detail: 'Success',
          summary: 'Products fetched successfully',
          duration: 5000,
        });
      },
      error: (error) => {
        this.toast.error({
          detail: 'Error',
          summary: 'Failed to fetch products',
          duration: 5000,
          sticky: true,
        });
      },
    });
  }

  ngOnInit(): void {
    this.getAll();
  }

  onDel(id: number): void {
    Swal.fire({
      title: 'Bạn có muốn xóa không?',
      text: 'Bạn sẽ không thể khôi phục điều này!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.bn.DeleteProducts(id).subscribe({
          next: () => {
            this.getAll();
            this.toast.success({
              detail: 'Success',
              summary: 'Product deleted successfully',
              duration: 5000,
            });
          },
          error: (error) => {
            this.toast.error({
              detail: 'Error',
              summary: 'Failed to delete product',
              duration: 5000,
              sticky: true,
            });
            console.error(error.message);
          },
        });
      }
    });
  }

  onEdit(id: number) {
    this.toast.info({
      detail: 'Edit',
      summary: 'Edit product functionality coming soon!',
      duration: 5000,
    });
  }
}
