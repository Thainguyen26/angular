import { Component, inject } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { NgToastModule, NgToastService } from 'ng-angular-popup';
import { UserService } from '../../service/user.service';
import { NgIf } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
  selector: 'app-regiter',
  standalone: true,
  imports: [
    HeaderComponent,
    NgIf,
    RouterLink,
    FooterComponent,
    ReactiveFormsModule,
    HttpClientModule,
    NgToastModule,
    NgxPaginationModule,
  ],
  providers: [UserService],
  templateUrl: './regiter.component.html',
  styleUrls: ['./regiter.component.css'],
})
export class RegiterComponent {
  router = inject(Router);
  RegiterForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
  });

  constructor(
    private bn: UserService,
    private toast: NgToastService // private toastr: ToastrService
  ) {}

  onSubmit() {
    if (this.RegiterForm.valid) {
      this.bn.Create(this.RegiterForm.value).subscribe({
        next: () => {
          this.router.navigate(['/login']);
          this.toast.success({
            detail: 'Success',
            summary: 'Đăng ký thành công!',
            duration: 5000,
          });
        },
        error: (err) => {
          console.error('Đăng ký thất bại: ', err);
          this.toast.error({
            detail: 'Error',
            summary: 'Đăng ký thất bại!',
            duration: 5000,
          });
        },
      });
    } else {
      this.toast.error({
        detail: 'Error',
        summary: 'Form không hợp lệ!',
        duration: 5000,
      });
    }
  }
}
