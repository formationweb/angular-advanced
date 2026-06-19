import { DialogRef } from '@angular/cdk/dialog';
import { Component, inject } from '@angular/core';

@Component({
  selector: 'app-user-dialog',
  imports: [],
  template: `
    <h1>Etes vous de quitter ?</h1>
    <button (click)="confirm(true)">Oui</button>
    <button (click)="confirm(false)">Non</button>
  `,
  styleUrl: './user-dialog.css',
})
export class UserDialog {
  private dialogRef = inject(DialogRef)

  confirm(bool: boolean) {
    if (bool) {
      this.dialogRef.close(true)
    }
    else {
      this.dialogRef.close(false)
    }
  }
}
