import { Component, effect, ElementRef, viewChild } from '@angular/core';

@Component({
  selector: 'app-draw',
  imports: [],
  template: `
    <canvas #canvasRef></canvas>
  `,
  styleUrl: './draw.css',
})
export class Draw {
   canvasEl = viewChild<ElementRef<HTMLCanvasElement>>('canvasRef')

   constructor() {
     effect(() => {
      console.log(this.canvasEl())
     })
   }
}
