import { Component, effect, ElementRef, viewChild } from '@angular/core';

@Component({
  imports: [],
  selector: 'app-draw',
  template: `
    <canvas #canvasRef></canvas>
  `
})
export class Draw {
  canvasEl = viewChild<ElementRef<HTMLCanvasElement>>('canvasRef')

  constructor() {
    effect(() => {
       console.log(this.canvasEl()?.nativeElement)
    })
  }
}
