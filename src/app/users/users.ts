import {
  Component,
  inject,
  signal,
} from '@angular/core';
import { UserCard } from './user-card/user-card';
import { UserStore } from '../store/user.store';
import { form, FormField } from '@angular/forms/signals';


@Component({
  imports: [UserCard, FormField],
  selector: 'app-users',
  styleUrl: './users.css',
  templateUrl: './users.html',
})
export class Users {
  private userStore = inject(UserStore)
  protected readonly users = this.userStore.users
  protected readonly nbUsers = this.userStore.nbUsers
  userModel = signal({
    email: '',
    name: ''
  })
  createForm = form(this.userModel)

  constructor() {
    this.userStore.getUsers('ana')
  }

  createUser(event: Event) {
    event.preventDefault()
    this.userStore.createUser(this.userModel())
  }

  removeUser(id: number) {
    this.userStore.deleteUser(id)
  }
}
