import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Auth } from './auth';
import { Router } from '@angular/router';

export const userSchema = {
  type: 'object',
  properties: {
    name: { type: 'string', minLength: 2 },
    email: { type: 'string', format: 'email' },

    address: {
      type: 'object',
      properties: {
        city: { type: 'string' },
        zipcode: { type: 'string', minLength: 5 },
      },
      required: ['city'],
    },
  },

  required: ['name', 'email'],
};

export const loginSchema = {
  type: 'object',
  properties: {
    password: { type: 'string', minLength: 2 },
    email: { type: 'string', format: 'email' },
  },
  required: ['password', 'email'],
};

type LoginPayload = {
  email: string;
  password: string;
};

@Component({
  imports: [ReactiveFormsModule],
  selector: 'app-login',
  styleUrl: './login.css',
  templateUrl: './login.html',
})
export class Login {
  private auth = inject(Auth);
  private router = inject(Router);
  private builder = inject(FormBuilder);
  form = this.builder.group({
    email: ['', [Validators.required, Validators.minLength(2)]],
    password: '',
    address: this.builder.group({
      city: '',
    }),
  });

  login() {
    const { email, password } = this.form.value as LoginPayload;
    this.auth.login(email, password).subscribe(() => {
      this.router.navigateByUrl('/');
    });
  }
}
