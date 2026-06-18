import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Auth } from '../core/services/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  private auth = inject(Auth);
  private router = inject(Router)
  passwordField = new FormControl('', {
    nonNullable: true
  });
  emailField = new FormControl('', {
    nonNullable: true
  });
  form = new FormGroup({
    password: this.passwordField,
    email: this.emailField,
  });

  login() {
    const { password, email } = this.form.value;
    this.auth.login(email!, password!).subscribe(() => {
        this.router.navigateByUrl('/')
    });
  }
}
