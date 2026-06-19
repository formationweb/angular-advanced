import { CanDeactivateFn } from "@angular/router";
import { Users } from "../../users/users";
import { inject } from "@angular/core";
import { Dialog } from "@angular/cdk/dialog";
import { UserDialog } from "../../user-edit/user-dialog/user-dialog";
import { map } from "rxjs";

export interface CanComponentDeactivate {
    isModified(): boolean
}

export const confirmDeactivateGuard: CanDeactivateFn<CanComponentDeactivate> = (component) => {
  const dialog = inject(Dialog)
  const isModified = component.isModified()
  if (!isModified) {
    return true
  }
  const dialogRef = dialog.open<boolean>(UserDialog)
  return dialogRef.closed.pipe(map((bool) => !!bool))
} 