import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Video } from './video/video';
import { Draw } from './draw/draw';

@Component({
  imports: [RouterOutlet, Draw],
  selector: 'app-root',
  styleUrl: './app.css',
  template: `<router-outlet />`
})
export class App {}
