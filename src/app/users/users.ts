import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { UserService } from './user';
import { User } from '../core/interfaces/user';
import { rxResource, toSignal } from '@angular/core/rxjs-interop';

@Component({
  imports: [],
  selector: 'app-users',
  templateUrl: './users.html'
})
export class Users {
  private userService = inject(UserService)
  //users = toSignal(this.userService.getAll())
  usersResource = rxResource({
    stream: () => {
      return this.userService.getAll()
    }
  })
  loading = computed(() => this.usersResource.isLoading())
}
