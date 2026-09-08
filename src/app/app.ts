import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Users } from "./users/users";

@Component({
  imports: [RouterOutlet, Users],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('myapp');
}
