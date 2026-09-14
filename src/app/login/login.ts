import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Auth } from './auth';
import { Router } from '@angular/router';

type LoginPayload = {
  email: string
  password: string
}

@Component({
  imports: [ReactiveFormsModule],
  selector: 'app-login',
  styleUrl: './login.css',
  templateUrl: './login.html',
})
export class Login {
  private auth = inject(Auth)
  private router = inject(Router)
  emailControl = new FormControl('')
  passControl = new FormControl('')
  form = new FormGroup({
    email: this.emailControl,
    password: this.passControl
  })

  login() {
      const { email, password } = this.form.value as LoginPayload
      this.auth.login(email, password).subscribe(() => {
         this.router.navigateByUrl('/')
      })
  }
}
