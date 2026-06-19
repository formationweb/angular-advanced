import { Component, computed, effect, inject, input, OnInit, output } from '@angular/core';
import { FormFactory, Schema } from '../../form-factory';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ɵEmptyOutletComponent } from "@angular/router";

@Component({
  selector: 'app-schema-form',
  imports: [ReactiveFormsModule, ɵEmptyOutletComponent],
  templateUrl: './schema-form.html',
  styleUrl: './schema-form.css',
})
export class SchemaForm {
  private formFactory = inject(FormFactory)
  readonly schema = input.required<Schema>()
  readonly form = input<FormGroup>()
  rootForm!: FormGroup
  readonly currentForm = computed(() => this.form() ?? this.rootForm)
  formSubmit = output<FormGroup>()

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
