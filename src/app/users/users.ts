import { ChangeDetectionStrategy, Component, computed, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { UserService } from './user';
import { User } from '../core/interfaces/user';
import { rxResource, takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { UserCard } from "./user-card/user-card";
import { interval } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
  imports: [UserCard, AsyncPipe],
  selector: 'app-users',
  templateUrl: './users.html'
})
export class Users {
  private userService = inject(UserService)
  private destroyRef = inject(DestroyRef)
  users$ =  this.userService.getAll().pipe(takeUntilDestroyed(this.destroyRef))
  // protected readonly users = toSignal(this.userService.getAll())
  //  protected readonly usersResource = rxResource({
  //   stream: () => {
  //     return this.userService.getAll()
  //   }
  // })
  // protected readonly loading = computed(() => this.usersResource.isLoading())

}
