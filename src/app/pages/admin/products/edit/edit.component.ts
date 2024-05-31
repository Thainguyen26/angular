import { NgIf } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  ActivatedRoute,
  Router,
  RouterLink,
  RouterOutlet,
} from '@angular/router';
import { ProductService } from '../../../../service/product.service';

@Component({
  selector: 'app-edit',
  standalone: true,
  imports: [
    RouterLink,
    RouterOutlet,
    ReactiveFormsModule,
    HttpClientModule,
    NgIf,
  ],
  providers: [ProductService],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.css',
})
export class EditComponent implements OnInit {
  id: number = 0;
  router = inject(Router);
  constructor(private bn: ProductService, private _route: ActivatedRoute) {}
  productsFormUpdate: FormGroup = new FormGroup({
    title: new FormControl('', [Validators.required, Validators.minLength(3)]),
    price: new FormControl('', [Validators.required, Validators.min(0)]),
    description: new FormControl('', Validators.required),
    thumbnail: new FormControl('', Validators.required),
    category: new FormControl('', Validators.required),
    isShowing: new FormControl(true),
  });
  ngOnInit(): void {
    this.id = this._route.snapshot.params['id'];
    this.bn.getOne(this.id).subscribe((data) => {
      console.log(data);
      this.productsFormUpdate = new FormGroup({
        title: new FormControl(data.title, [
          Validators.required,
          Validators.minLength(3),
        ]),
        price: new FormControl(data.price, [
          Validators.required,
          Validators.min(0),
        ]),
        description: new FormControl(data.description, Validators.required),
        thumbnail: new FormControl(data.thumbnail, Validators.required),
        category: new FormControl(data.category, Validators.required),
        isShowing: new FormControl(data.isShowing),
      });
    });
  }
  onUpdate() {
    this.bn
      .Update(this.id, this.productsFormUpdate.value)
      .subscribe(() => this.router.navigate(['/admin/products/list']));
  }
}
