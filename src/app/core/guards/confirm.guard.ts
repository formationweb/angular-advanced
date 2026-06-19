import { CanDeactivateFn } from "@angular/router";
import { Users } from "../../users/users";

export interface CanComponentDeactivate {
    isModified(): boolean
}

export const confirmDeactivateGuard: CanDeactivateFn<CanComponentDeactivate> = (component) => {
    let bool = true
    const isModified = component.isModified()
    if (isModified) {
         bool = confirm('Etes vous ?')
    }
    return bool
} 