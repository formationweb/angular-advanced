import { Component, computed, effect, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Users } from "./users/users";
import { Draw } from "./draw/draw";
import { Navbar } from "./navbar/navbar";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Users, Navbar],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('myapp');
  protected readonly age = signal(15)
  protected readonly isMinor = computed(() => this.age() < 18)
}
