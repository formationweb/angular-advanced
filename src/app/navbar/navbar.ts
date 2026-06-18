import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UsersService } from '../users/users.service';
import { toObservable } from '@angular/core/rxjs-interop';
import { Subject, switchMap, takeUntil } from 'rxjs';

@Component({
  selector: 'app-navbar',
  imports: [FormsModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {
  private usersService = inject(UsersService)
  protected readonly searchValue = this.usersService.searchValue
  notifier = new Subject<void>()

  search$ = toObservable(this.searchValue).pipe(
    takeUntil(this.notifier)
  )

  test() {
    this.notifier.next()
  }

  // takeUntil avec Subject
}
