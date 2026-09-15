import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Video } from './video/video';

@Component({
  imports: [RouterOutlet, Video],
  selector: 'app-root',
  styleUrl: './app.css',
  template: `<app-video />`
})
export class App {}
