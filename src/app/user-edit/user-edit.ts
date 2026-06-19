import { Component, inject, input } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { UsersService } from '../users/users.service';
import { tap } from 'rxjs';

@Component({
  selector: 'app-user-edit',
  imports: [ReactiveFormsModule],
  templateUrl: './user-edit.html',
  styleUrl: './user-edit.css',
})
export class UserEdit {
  private builder = inject(FormBuilder)
  private usersService = inject(UsersService)
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
}
