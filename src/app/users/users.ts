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
  signal,
} from '@angular/core';
import { UserService } from './user.service';
import { User } from './user';
import { rxResource, toSignal } from '@angular/core/rxjs-interop';
import { UserCard } from './user-card/user-card';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  imports: [UserCard, FormsModule],
  selector: 'app-users',
  styleUrl: './users.css',
  templateUrl: './users.html',
})
export class Users {
  private userService = inject(UserService);
  //private route = inject(ActivatedRoute);
  private router = inject(Router)
  
  //queryParamMap = toSignal(this.route.queryParamMap);

  protected readonly q = input('')
  protected readonly ext = input('')

  protected readonly searchValue = linkedSignal(() => this.q() ?? '');
  protected readonly extensionValue = linkedSignal(() => this.ext() ?? '');

  protected readonly users = rxResource({
    stream: () => {
      return this.userService.getAll();
    },
  });
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
