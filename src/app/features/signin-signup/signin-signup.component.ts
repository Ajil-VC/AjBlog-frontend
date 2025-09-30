import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

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

  constructor(private fb: FormBuilder, private route: ActivatedRoute) {

    this.authForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      userName: ['']
    })
  }

  ngOnInit(): void {
    this.type = this.route.snapshot.data['type'];
  }

  isEmailExists: boolean = false;
  formControl(input: 'email' | 'password') {
    return this.authForm.get(input);
  }

  onSubmit() {
    console.log(this.authForm.value)
  }
}
