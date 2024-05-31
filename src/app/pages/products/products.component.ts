import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { RouterLink, RouterOutlet } from '@angular/router';
import { NgFor } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { Products } from '../../types/products';
import { ProductService } from '../../service/product.service';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [
    HeaderComponent,
    FooterComponent,
    RouterOutlet,
    RouterLink,
    NgFor,
    HttpClientModule,
    ReactiveFormsModule,
    ToastrModule,
  ],

  providers: [ProductService],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css',
})
export class ProductsComponent {
  products: Array<Products> = new Array<Products>();
  SearchForm: FormGroup = new FormGroup({
    title: new FormControl(),
  });
  getAll() {
    this.bn.getProducts().subscribe({
      next: (products) => {
        this.products = products;
      },
      error: (error) => {
        console.error(error.message);
      },
    });
  }
  constructor(private bn: ProductService) {}
  onSearch(): void {
    this.bn.getSearch(this.SearchForm.value.title).subscribe((data) => {
      this.products = data;
    });
  }
}
