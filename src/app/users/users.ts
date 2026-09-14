import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { UserService } from './user.service';
import { User } from './user';
import { rxResource, toSignal } from '@angular/core/rxjs-interop';
import { UserCard } from './user-card/user-card';

@Component({
  imports: [UserCard],
  selector: 'app-users',
  styleUrl: './users.css',
  templateUrl: './users.html'
})
export class Users {
  private userService = inject(UserService)
  // protected readonly users = toSignal(this.userService.getAll(), {
  //   initialValue: []
  // })
  title = signal('Utilisateurs')

  protected readonly users = rxResource({
    stream: () => {
      return this.userService.getAll()
    }
  })
}
