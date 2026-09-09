import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from './auth';
import { Router } from '@angular/router';
import { FormFactory } from '../json-schema-form/form-factory';

const loginSchema = {
  type: 'object',
  properties: {
    password: { type: 'string', minLength: 2 },
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
  required: ['password', 'email'],
};

@Component({
  imports: [ReactiveFormsModule],
  selector: 'app-login',
  styleUrl: './login.css',
  templateUrl: './login.html',
})
export class Login {
  private authService = inject(AuthService);
  private router = inject(Router);
  private builder = inject(FormBuilder);
  private formFactory = inject(FormFactory);
  form = this.formFactory.createForm(loginSchema as any);
  // emailControl = new FormControl()
  // passControl = new FormControl()
  // form = new FormGroup({
  //   email: this.emailControl,
  //   password: this.passControl
  // })

  login() {
    const { email, password } = this.form.value as { email: string; password: string };
    console.log(email, password);
    // this.authService.login(email, password).subscribe(() => {
    //   this.router.navigateByUrl('/');
    // });
  }
}
