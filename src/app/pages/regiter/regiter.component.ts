import { Component, inject } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import {
  AbstractControl,
  AsyncValidatorFn,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { NgToastModule, NgToastService } from 'ng-angular-popup';
import { UserService } from '../../service/user.service';
import { NgIf } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgxPaginationModule } from 'ngx-pagination';
import { Observable, debounceTime, first, map, switchMap } from 'rxjs';
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
  RegiterForm: FormGroup = new FormGroup(
    {
      username: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
      ConfirmPassword: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
    },
    { validators: this.confirmPassword }
  );

  constructor(
    private bn: UserService,
    private toast: NgToastService // private toastr: ToastrService
  ) {}
  confirmPassword(form: AbstractControl) {
    const password = form.get('password')?.value;
    const ConfirmPassword = form.get('ConfirmPassword')?.value;
    return password === ConfirmPassword ? null : { passwordMismatch: true };
  }

  onSubmit() {
    if (this.RegiterForm.invalid) {
      return;
    }

    this.bn.Create(this.RegiterForm.value).subscribe({
      next: () => {
        this.toast.success({
          detail: 'Success',
          summary: 'Đăng ký thành công!',
          duration: 5000,
        });
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 2000);
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
  }
}
