import { Component, effect, ElementRef, viewChild, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-draw',
  imports: [],
  template: ` <canvas #canvasRef></canvas> `,
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './draw.css',
})
export class Draw {
  canvasEl = viewChild<ElementRef<HTMLCanvasElement>>('canvasRef');

  constructor() {
    effect(() => {
      console.log(this.canvasEl());
    });
  }
}
