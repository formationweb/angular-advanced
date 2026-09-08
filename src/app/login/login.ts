import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from './auth';
import { Router } from '@angular/router';

@Component({
  imports: [ReactiveFormsModule],
  selector: 'app-login',
  styleUrl: './login.css',
  templateUrl: './login.html',
})
export class Login {
  private authService = inject(AuthService)
  private router = inject(Router)
  emailControl = new FormControl()
  passControl = new FormControl()
  form = new FormGroup({
    email: this.emailControl,
    password: this.passControl
  })

  login() {
    const { email, password } = this.form.value
    this.authService.login(email, password).subscribe(() => {
      this.router.navigateByUrl('/')
    })
  }
}
