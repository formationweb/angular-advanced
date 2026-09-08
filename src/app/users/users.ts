import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { UserService } from './user';
import { User } from '../core/interfaces/user';
import { rxResource, toSignal } from '@angular/core/rxjs-interop';
import { UserCard } from "./user-card/user-card";

@Component({
  imports: [UserCard],
  selector: 'app-users',
  templateUrl: './users.html'
})
export class Users {
  private userService = inject(UserService)
  //protected readonly users = toSignal(this.userService.getAll())
   protected readonly usersResource = rxResource({
    stream: () => {
      return this.userService.getAll()
    }
  })
  protected readonly loading = computed(() => this.usersResource.isLoading())
}
