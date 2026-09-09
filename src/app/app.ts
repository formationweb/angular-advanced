import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Video } from './video/video';

@Component({
  imports: [RouterOutlet, Video],
  selector: 'app-root',
  template: `<app-video />`
})
export class App {}
