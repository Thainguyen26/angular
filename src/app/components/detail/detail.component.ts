import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink, RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { ProductService } from '../../service/product.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-detail',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,
    HeaderComponent,
    FooterComponent,
    HttpClientModule,
  ],
  providers: [ProductService],
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.css',
})
export class DetailComponent {
  id: number = 0;
  products: any;
  constructor(
    private _route: ActivatedRoute,
    private prvServi: ProductService
  ) {}

  ngOnInit(): void {
    this.id = this._route.snapshot.params['id'];
    this.prvServi.getOne(this.id).subscribe((data) => {
      this.products = data;
    });
  }
}
