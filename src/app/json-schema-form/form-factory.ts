import { inject, Injectable } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

export type Schema = {
    type: string
    properties?: Record<string, Schema>
    required?: string[]
    minLength?: number
    minimum?: number
    format?: string
}

@Injectable({
    providedIn: 'root'
})
export class JsonSchemaFormFactory {
    private readonly formBuilder = inject(FormBuilder)

    create(schema: Schema): FormGroup {
        const createGroup = (groupObj: Schema) => {
            let group: Record<string, any> = {}
            for (let fieldName in groupObj.properties) {
                const schemaProp = groupObj.properties?.[fieldName]
                if (schemaProp?.type == 'object') {
                     group[fieldName] = createGroup(schemaProp)
                }
                else {
                    const validators = []
                    if (schemaProp?.minLength) {
                        validators.push(Validators.minLength(schemaProp?.minLength))
                    }
                    if (schemaProp?.format == 'email') {
                        validators.push(Validators.email)
                    }
                    if (groupObj.required?.includes(fieldName)) {
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