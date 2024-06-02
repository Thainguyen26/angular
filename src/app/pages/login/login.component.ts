import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { NgToastModule, NgToastService } from 'ng-angular-popup';
import { RegiterComponent } from '../regiter/regiter.component';
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    RouterLink,
    RouterOutlet,
    ReactiveFormsModule,
    HeaderComponent,
    FooterComponent,
    RegiterComponent,
    NgToastModule,
    NgxPaginationModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private toast: NgToastService // private toastr: ToastrService
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      console.log(this.loginForm);
      // Xử lý đăng nhập ở đây
      // Ví dụ: gọi service để thực hiện đăng nhập, sau đó chuyển hướng hoặc hiển thị thông báo
      this.toast.success({
        detail: 'Success',
        summary: 'Đăng nhập thành công',
        duration: 5000,
      });
      this.router.navigate(['/']);
    } else {
      this.toast.error({
        detail: 'Error',
        summary: 'Đăng nhập không thành công',
        duration: 5000,
        sticky: true,
      });
    }
  }
}
