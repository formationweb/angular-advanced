import { inject, Injectable } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";

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
        let group: Record<string, any> = {}
        for (let fieldName in schema.properties) {
            group[fieldName] = ['']
        }
        return this.formBuilder.group(group)
    }
}