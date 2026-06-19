import { Component, computed, effect, signal, ChangeDetectionStrategy, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Users } from './users/users';
import { Draw } from './draw/draw';
import { Navbar } from './navbar/navbar';
import { Video } from './video/video';
import { Dialog } from '@angular/cdk/dialog';

@Component({
  selector: 'app-dialog',
  template: `
    <h1>test</h1>
  `
})
class DialogComponent {}

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Users, Navbar, Video],
  templateUrl: './app.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './app.css',
})
export class App {
  private dialog = inject(Dialog)
  protected readonly title = signal('myapp');
  protected readonly age = signal(15);
  protected readonly isMinor = computed(() => this.age() < 18);

  openDialog() {
     const dialogRef = this.dialog.open(DialogComponent)
     dialogRef.closed.subscribe(() => {
      console.log('terminé !')
     })

  }
}
