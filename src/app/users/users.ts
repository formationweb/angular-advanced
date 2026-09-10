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
import { UserStore } from '../store/user.store';
import { form, FormField } from '@angular/forms/signals';
import { HeavySimulationComponent } from "../heavy.component";

@Component({
  imports: [UserCard, FormsModule, FormField, HeavySimulationComponent],
  selector: 'app-users',
  templateUrl: './users.html'
})
export class Users {
  private userStore = inject(UserStore)
  protected readonly users = this.userStore.users
  protected readonly nbUsers = this.userStore.nbUsers
  protected readonly userModel = signal({
    email: '',
    name: ''
  })
  protected readonly userForm = form(this.userModel)

  constructor() {
    this.userStore.getUsers('Leanne')
  }

  addUser(event: Event) {
    event.preventDefault()
    this.userStore.createUser(this.userModel())
  }

  removeUser(id: number) {
    this.userStore.deleteUser(id)
  }
}
