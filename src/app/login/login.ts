import { Component, computed, effect, signal } from '@angular/core';
import { form, FormField, minLength, required, SchemaPathTree } from '@angular/forms/signals';

type LoginModel = {
  email: string
  password: string
}

function groupValidators(path: SchemaPathTree<LoginModel>) {
    required(path.email, {
      message: 'Email requis'
    })
    minLength(path.email, 2)
    required(path.password)
}

@Component({
  imports: [FormField],
  selector: 'app-login',
  styleUrl: './login.css',
  templateUrl: './login.html',
})
export class Login {
  loginModel = signal({
    email: '',
    password: '',
    address: {
      city: ''
    }
  })
  loginForm = form(this.loginModel, (path) => {
     groupValidators(path)
  })
  isValid = computed(() => this.loginForm().valid())
  errorEmail = computed(() => this.loginForm.email().errors()[0]?.message)

  constructor() {
    effect(() => {
      console.log(this.loginForm())
    })
  }

  login(event: Event) {
    event.preventDefault()
  }
}
