import {
  ChangeDetectionStrategy,
  Component,
  computed,
  DestroyRef,
  effect,
  inject,
  input,
  linkedSignal,
  OnDestroy,
  OnInit,
  resource,
  signal,
} from '@angular/core';
import { UserService } from './user.service';
import { User } from './user';
import { rxResource, toSignal } from '@angular/core/rxjs-interop';
import { UserCard } from './user-card/user-card';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { httpResource } from '@angular/common/http';

@Component({
  imports: [UserCard, FormsModule],
  selector: 'app-users',
  styleUrl: './users.css',
  templateUrl: './users copy.html',
})
export class Users {
  private userService = inject(UserService);
  private route = inject(ActivatedRoute);
  private router = inject(Router)
  
  //queryParamMap = toSignal(this.route.queryParamMap);

  protected readonly q = input('')
  protected readonly ext = input('')

  protected readonly searchValue = linkedSignal(() => this.q() ?? '');
  protected readonly extensionValue = linkedSignal(() => this.ext() ?? '');

  // protected readonly users = rxResource({
  //   params: () => {
  //     return {
  //       search: this.searchValue()
  //     }
  //   },
  //   stream: ({ params }) => {
  //     return this.userService.getAll(params.search);
  //   },
  // });

  // protected readonly users = resource({
  //    params: () => {
  //     return {
  //       search: this.searchValue()
  //     }
  //   },
  //   loader: ({ params, abortSignal }): Promise<User[]> => {
  //     return fetch('https://jsonplaceholder.typicode.com/users?search=' + params.search, {
  //       signal: abortSignal
  //     })
  //       .then(res => res.json())
  //   }
  // })

  protected readonly users = httpResource<User[]>(
    () => 'https://jsonplaceholder.typicode.com/users?search=' + this.searchValue())

  protected readonly usersFiltered = computed(() => {
    return this.users
      .value()
      ?.filter(
        (user) =>
          user.name.toLowerCase().includes(this.searchValue().toLowerCase()) &&
          user.email.endsWith(this.extensionValue()),
      );
  });
  protected readonly extensions = computed(() => {
    return new Set(this.users.value()?.map(user => '.' + user.email.split('.').pop()))
  })

  constructor() {
    effect(() => {
      this.router.navigate([], {
        relativeTo: this.route,
        queryParams: { q: this.searchValue(), ext: this.extensionValue() },
        queryParamsHandling: '',
        replaceUrl: true,
      });
    });
  }
}
