import { ChangeDetectionStrategy, Component, computed, DestroyRef, effect, inject, input, linkedSignal, OnInit, resource, signal } from '@angular/core';
import { UserService } from './user';
import { User } from '../core/interfaces/user';
import { rxResource, takeUntilDestroyed, toObservable, toSignal } from '@angular/core/rxjs-interop';
import { UserCard } from "./user-card/user-card";
import { interval } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { httpResource } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  imports: [UserCard, AsyncPipe, FormsModule],
  selector: 'app-users',
  templateUrl: './users.html'
})
export class Users {
  private userService = inject(UserService)
  private destroyRef = inject(DestroyRef)
  private route = inject(ActivatedRoute)
  private router = inject(Router)

  search = input('')
  ext = input('')


  //users$ =  this.userService.getAll().pipe(takeUntilDestroyed(this.destroyRef))
  protected readonly users = toSignal(this.userService.getAll(), {
    initialValue: []
  })
  //  protected readonly usersResource = rxResource({
  //   stream: () => {
  //     return this.userService.getAll()
  //   }
  // })
  protected readonly searchValue = linkedSignal(() => this.search())
  protected readonly extension = linkedSignal(() => this.ext() ?? '')
  // protected readonly usersResource = resource({
  //   params: () => {
  //     return {
  //       search: this.searchValue()
  //     }
  //   },
  //   loader: ({ params, abortSignal }) => {
  //     return fetch('https://jsonplaceholder.typicode.com/users?search=' + params.search, {
  //       signal: abortSignal
  //     }).then(res => res.json()) 
  //   }
  // })
  // protected readonly usersResource = httpResource<User[]>(
  //     () => 'https://jsonplaceholder.typicode.com/users?search=' + this.search())
 // protected readonly loading = computed(() => this.usersResource.isLoading())
  protected readonly extensions =  computed(() => {
    return this.users()
      .map(user => '.' + user.email.split('.').pop())
  })
  protected readonly usersFiltered = computed(() => {
    return this.users().filter(user => {
      return user.name.includes(this.searchValue()) && user.email.endsWith(this.extension())
    })
  })

    constructor() {
      // this.route.queryParamMap.subscribe(map => {
      //   const search = map.get('search')
      //   console.log(search)
      // })
      effect(() => {
         this.router.navigate([], {
           queryParams: { search: this.searchValue(), ext: this.extension() },
           replaceUrl: true
         })
      })
    }
}
