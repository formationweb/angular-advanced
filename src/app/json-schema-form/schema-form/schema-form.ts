import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FormFactory, Schema } from './../form-factory';
import { Component, computed, effect, inject, input, output } from '@angular/core';

@Component({
  imports: [ReactiveFormsModule],
  selector: 'app-schema-form',
  styleUrl: './schema-form.css',
  templateUrl: './schema-form.html',
})
export class SchemaForm {
  private formFactory = inject(FormFactory)
  readonly schema = input.required<Schema>()
  formSubmit = output<FormGroup>()
  form = input<FormGroup>()
  rootForm!: FormGroup
  fields = computed(() => Object.entries(this.schema().properties ?? []))
  readonly currentForm = computed(() => this.form() ?? this.rootForm)

  constructor() {
    effect(() => {
      if (!this.form()) {
        this.rootForm = this.formFactory.createForm(this.schema())
      }
    })
  }

  getGroup(name: string): FormGroup {
    return this.currentForm().get(name) as FormGroup
  }
}
