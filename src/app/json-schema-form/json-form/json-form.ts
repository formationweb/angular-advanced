import { Component, computed, effect, inject, input, output, signal } from '@angular/core';
import { JsonSchemaFormFactory, Schema } from '../form-factory';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  imports: [ReactiveFormsModule],
  selector: 'app-json-form',
  styleUrl: './json-form.css',
  templateUrl: './json-form.html',
})
export class JsonForm {
  private jsonSchemaFormFactory = inject(JsonSchemaFormFactory)
  readonly schema = input.required<Schema>()
  readonly form = input<FormGroup>()
  readonly formSubmit = output<FormGroup>()
  readonly fields = computed(() => Object.entries(this.schema().properties ?? {}))
  rootForm!: FormGroup
  readonly currentForm = computed(() => this.form() ?? this.rootForm)

  constructor() {
    effect(() => {
      if (this.form()) return
      this.rootForm = this.jsonSchemaFormFactory.create(this.schema())
    })
  }

  getGroup(name: string): FormGroup {
    return this.currentForm().get(name) as FormGroup
  }
}
