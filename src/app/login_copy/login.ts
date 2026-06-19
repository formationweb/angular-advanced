import { Component, computed, effect, signal } from '@angular/core';
import { form, FormField, required } from '@angular/forms/signals';


@Component({
  selector: 'app-login',
  templateUrl: './login.html',
  styleUrl: './login.css',
  imports: [FormField],
})
export class Login {
  readonly loginModel = signal({
    email: '',
    password: ''
  })
  loginForm = form(this.loginModel, (path) => {
     required(path.email, { message: 'email requis' }) 
  })
  isInvalid = computed(() => this.loginForm().invalid())
  errorEmail = computed(() => this.loginForm.email().errors()[0]?.message)

  login(event: Event) {
    event.preventDefault()
  }
}
