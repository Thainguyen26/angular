import { Component, OnInit, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { ProductService } from '../../../../service/product.service';
import { HttpClientModule } from '@angular/common/http';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-create',
  standalone: true,
  imports: [
    RouterLink,
    RouterOutlet,
    ReactiveFormsModule,
    HttpClientModule,
    NgIf,
  ],
  providers: [ProductService],
  templateUrl: './create.component.html',
  styleUrl: './create.component.css',
})
export class CreateComponent implements OnInit {
  router = inject(Router);
  constructor(private bn: ProductService) {}
  productsFormCreate: FormGroup = new FormGroup({
    title: new FormControl('', [Validators.required, Validators.minLength(3)]),
    price: new FormControl('', [Validators.required, Validators.min(0)]),
    description: new FormControl('', Validators.required),
    thumbnail: new FormControl('', Validators.required),
    category: new FormControl('', Validators.required),
    isShowing: new FormControl(true),
  });
  ngOnInit(): void {}
  onCreate() {
    this.bn
      .Create(this.productsFormCreate.value)
      .subscribe(() => this.router.navigate(['/admin/products/list']));
  }
}
