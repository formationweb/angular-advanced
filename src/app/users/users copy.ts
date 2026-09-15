import { ChangeDetectionStrategy, Component, computed, DestroyRef, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { UserService } from './user.service';
import { User } from './user';
import { rxResource, takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { UserCard } from './user-card/user-card';
import { Subscription } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
  imports: [UserCard, AsyncPipe],
  selector: 'app-users',
  styleUrl: './users.css',
  template: ``
})
export class Users  {
  private userService = inject(UserService)
  private destroyRef = inject(DestroyRef)
  // protected readonly users = toSignal(this.userService.getAll(), {
  //   initialValue: []
  // })
  title = signal('Utilisateurs')

  users$ = this.userService.getAll()

  // protected readonly users = rxResource({
  //   stream: () => {
  //     return this.userService.getAll()
  //   }
  // })

  // constructor() {
  //   this.userService.getAll()
  //   .pipe(
  //     //takeUntilDestroyed(this.destroyRef) // dans le constructeur n'a pas besoin de destroyRef (juste exemple ici)
  //   )
  //   .subscribe()
  // }
}
