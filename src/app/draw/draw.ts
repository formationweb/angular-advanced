import { Component, effect, ElementRef, OnInit, viewChild } from '@angular/core';

@Component({
  imports: [],
  selector: 'app-draw',
  template: `
    <canvas #canvasRef></canvas>
  `
})
export class Draw  {
  protected readonly canvasEl = viewChild<ElementRef<HTMLCanvasElement>>('canvasRef')

  constructor() {
    effect((onCleanup) => {
      // const counter = setInterval(() => {

      // }, 1000)
      // onCleanup(() => {
      //   clearInterval(counter)
      // })
    })
  }
}
