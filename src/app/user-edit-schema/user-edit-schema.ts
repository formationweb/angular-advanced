import { Component } from '@angular/core';
import { SchemaForm } from '../components/schema-form/schema-form';
import { userFormConfig } from '../schemas/user';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-user-edit-schema',
  imports: [SchemaForm],
  templateUrl: './user-edit-schema.html',
  styleUrl: './user-edit-schema.css',
})
export class UserEditSchema {
  userSchema = userFormConfig as any
  resultForm(form: FormGroup) {
    console.log(form.invalid, form.value)
  }
}
