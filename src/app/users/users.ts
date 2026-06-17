import { Component, inject, signal } from '@angular/core';
import { User, UsersService } from './users.service';

@Component({
  selector: 'app-users',
  imports: [],
  templateUrl: './users.html',
  styleUrl: './users.css',
})
export class Users {
  private usersService = inject(UsersService)
  protected readonly users = signal<User[]>([])

  constructor() {
    this.usersService.getUsers().subscribe(users => {
     this.users.set(users)
    })
  }
}
