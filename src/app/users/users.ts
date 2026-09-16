import {
  Component,
  inject,
} from '@angular/core';
import { UserCard } from './user-card/user-card';
import { UserStore } from '../store/user.store';


@Component({
  imports: [UserCard],
  selector: 'app-users',
  styleUrl: './users.css',
  templateUrl: './users.html',
})
export class Users {
  private userStore = inject(UserStore)
  protected readonly users = this.userStore.users
  protected readonly nbUsers = this.userStore.nbUsers

  constructor() {
    this.userStore.getUsers('ana')
  }
}
