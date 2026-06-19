import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { FormArray, FormBuilder, FormControl, ReactiveFormsModule } from '@angular/forms';
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
    email: '',
    address: this.builder.group({
      city: '',
      street: ''
    }),
    tags: this.builder.array([])
  })
  user = rxResource({
    params: () => ({
       id: this.id()
    }),
    stream: ({ params }) => {
      return this.usersService.getUser(params.id).pipe(
        tap((user) => {
          this.arrayTags.clear()
          for (let tag of user.tags) {
            this.arrayTags.push(this.builder.control(''))
          }
          this.form.patchValue(user)
        })
      )
    }
  })

  get arrayTags(): FormArray {
    return this.form.get('tags') as FormArray
  }

  get tagControls(): FormControl[] {
    return this.arrayTags.controls as FormControl[]
  }

  //arrayTags = computed(() =>  this.form.get('tags') as FormArray)

  isModified() {
    return this.form.dirty
  }

  addTag() {
    this.arrayTags.push(this.builder.control('test'))
  }

  removeTag(index: number) {
    this.arrayTags.removeAt(index)
  }
}
