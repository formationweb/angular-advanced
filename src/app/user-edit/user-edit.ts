import { Component, inject, input } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { UsersService } from '../users/users.service';
import { tap } from 'rxjs';
import { RouterLink } from "@angular/router";
import { Dialog } from '@angular/cdk/dialog';
import { UserDialog } from './user-dialog/user-dialog';
import { CanComponentDeactivate } from '../core/guards/confirm.guard';

@Component({
  selector: 'app-user-edit',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './user-edit.html',
  styleUrl: './user-edit.css',
})
export class UserEdit implements CanComponentDeactivate {
  private builder = inject(FormBuilder)
  private usersService = inject(UsersService)
  private dialog = inject(Dialog)
  readonly id = input.required<number>()
  form = this.builder.group({
    name: '',
    email: ''
  })
  user = rxResource({
    params: () => ({
       id: this.id()
    }),
    stream: ({ params }) => {
      return this.usersService.getUser(params.id).pipe(
        tap((user) => {
          this.form.patchValue(user)
        })
      )
    }
  })

  isModified() {
    return this.form.dirty
  }
}
