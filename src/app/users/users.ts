import { Component, inject, OnDestroy, resource, signal } from '@angular/core';
import { User, UsersService } from './users.service';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import { UserCard } from './user-card/user-card';
import { interval, Subscription } from 'rxjs';

@Component({
  selector: 'app-users',
  imports: [FormsModule, UserCard],
  templateUrl: './users.html',
  styleUrl: './users.css',
})
export class Users {
  private usersService = inject(UsersService)
  title = signal('Utilisateurs')
  protected readonly users = this.usersService.usersFiltered
  // protected readonly users = resource({
  //   params: () => {
  //     return {
  //       search: this.searchValue()
  //     }
  //   },
  //   loader: ({ params, abortSignal }): Promise<User[]> => {
  //     return fetch('https://jsonplaceholder.typicode.com/users?search=' + params.search, {
  //       signal: abortSignal
  //     }).then(res => res.json())
  //   }
  // })
   //protected readonly users = httpResource<User[]>(() => 'https://jsonplaceholder.typicode.com/users?search=' 
  //+ this.searchValue())

  constructor() {
    interval(1000)
    .pipe(
      takeUntilDestroyed()
    )
    .subscribe(console.log)
    this.usersService
      .getUsers()
      .pipe(
        takeUntilDestroyed()
      )
      .subscribe()
  }

}
