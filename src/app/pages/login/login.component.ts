import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    RouterLink,
    RouterOutlet,
    ReactiveFormsModule,
    HeaderComponent,
    FooterComponent,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router // private toastr: ToastrService
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      // Xử lý đăng nhập ở đây
      // Ví dụ: gọi service để thực hiện đăng nhập, sau đó chuyển hướng hoặc hiển thị thông báo
      // this.toastr.success('Đăng nhập thành công!', 'Thành công');
      this.router.navigate(['/home']);
    } else {
      // this.toastr.error('Vui lòng kiểm tra lại thông tin đăng nhập', 'Lỗi');
    }
  }
}
