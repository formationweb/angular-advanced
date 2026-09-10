import { Component, computed, effect, inject, signal } from '@angular/core';
import { form, FormField, minLength, required, SchemaPathTree } from '@angular/forms/signals';

type LoginModel = {
  email: string
  password: string,
  address: {
    city: string
  }
}

function groupValidators(path: SchemaPathTree<LoginModel>) {
      required(path.email)
      minLength(path.email, 2)
}

@Component({
  imports: [FormField],
  selector: 'app-login',
  styleUrl: './login.css',
  templateUrl: './login.html',
})
export class Login {
  readonly loginModel = signal<LoginModel>({
    email: '',
    password: '',
    address: {
      city: ''
    } 
  })
  loginForm = form(this.loginModel, (path) => {
    groupValidators(path)
  })
  email = computed(() => this.loginModel().email)
  isInvalid = computed(() => this.loginForm().invalid())
  errorEmail = computed(() => this.loginForm.email().errors()[0]?.kind)
  city = computed(() => this.loginForm.address.city())

  constructor() {
    effect(() => {
        console.log()
    })
  }

  login(event: Event) {
    event.preventDefault()
   
  }
}
