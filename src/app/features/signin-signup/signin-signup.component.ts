import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from './data/auth.service';
import { ToastService } from '../../core/data/toast/toast.service';

@Component({
  selector: 'app-signin-signup',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './signin-signup.component.html',
  styleUrl: './signin-signup.component.css'
})
export class SigninSignupComponent {

  type: 'sign_up' | 'sign_in' = 'sign_in';
  authForm: FormGroup;

  constructor(
    private _fb: FormBuilder,
    private _route: ActivatedRoute,
    private _authService: AuthService,
    private _toast: ToastService
  ) {

    this.authForm = this._fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      userName: ['']
    })
  }

  ngOnInit(): void {
    this.type = this._route.snapshot.data['type'];
  }

  isEmailExists: boolean = false;
  formControl(input: 'email' | 'password') {
    return this.authForm.get(input);
  }

  onSubmit() {

    const formData = this.authForm.value;
    this._authService.onSubmit(this.type, formData.email, formData.password, formData.userName)
      .subscribe({
        next: (res) => {

          if (res.status) {
            this._toast.showSuccess(res.message, 'Registration Success');
          }
        },
        error: (err) => {
          this._toast.showError(err.message);
        }
      })
  }
}
