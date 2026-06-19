import { inject, Injectable, Service } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

export type Field = {
    name: string
    type: 'string' | 'boolean' | 'number' | 'object'
    validators?: ('required' | 'email')[],
    properties?: Schema
}
export type Schema = Field[]

@Injectable({
    providedIn: 'root'
})
export class FormFactory {
    private readonly formBuilder = inject(FormBuilder)

    createForm(schema: Schema): FormGroup {
         const createGroup = (groupObj: Schema): FormGroup => {
            let group: Record<string, unknown> = {}
            for (let field of groupObj) {
                const mappingValidator = {
                    email: Validators.email,
                    required: Validators.required
                }
                group[field.name] = field.type == 'object' 
                    ? createGroup(field.properties!) : 
                    ['', field.validators?.map(name => mappingValidator[name])]
            }
            return this.formBuilder.group(group)
         }
        return createGroup(schema)
    }
}
