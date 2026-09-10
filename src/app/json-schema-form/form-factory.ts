import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { inject, Injectable } from "@angular/core";

export type Schema = {
    type: string
    properties?: Record<string, Schema>,
    required?: string[]
    minLength?: number
    minimum?: number
    format?: string
}


@Injectable({
    providedIn: 'root'
})
export class FormFactory {
    private readonly formBuilder = inject(FormBuilder)

    createForm(schema: Schema): FormGroup {
        const createGroup = (groupObj: Schema) => {
            let group: Record<string, any> = {}
            for (let fieldName in groupObj.properties) {
                const schemaProp = groupObj.properties[fieldName]
                if (schemaProp.type == 'object') {
                    group[fieldName] = createGroup(schemaProp)
                }
                else {
                    const validators = []

                    if (schemaProp.minLength) {
                        validators.push(Validators.minLength(schemaProp.minLength))
                    }
                    if (schema.required?.includes(fieldName)) {
                        validators.push(Validators.required)
                    }
                    
                    group[fieldName] = ['', validators]
                }
            }
            return this.formBuilder.group(group)
        }
        return createGroup(schema)
    }
}