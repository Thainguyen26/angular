import { Component } from '@angular/core';
import { FooterComponent } from '../../components/footer/footer.component';
import { HeaderComponent } from '../../components/header/header.component';
import { RouterLink, RouterOutlet } from '@angular/router';
import { NgFor } from '@angular/common';
import { Products } from '../../types/products';
import { ProductService } from '../../service/product.service';
import { HttpClientModule } from '@angular/common/http';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';

@Component({
  selector: 'app-home',
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
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  products: Array<Products> = new Array<Products>();
  SearchForm: FormGroup = new FormGroup({
    title: new FormControl(),
  });
  constructor(private bn: ProductService) {}

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
  ngOnInit(): void {
    this.getAll();
  }
  onSearch(): void {
    this.bn.getSearch(this.SearchForm.value.title).subscribe((data) => {
      this.products = data;
    });
  }
}
