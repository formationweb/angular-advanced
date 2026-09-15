import { Component, ElementRef, OnInit, viewChild } from '@angular/core';

@Component({
  imports: [],
  selector: 'app-draw',
  template: `
    <canvas #canvasRef></canvas>
  `
})
export class Draw implements OnInit {
  protected readonly canvasEl = viewChild<ElementRef<HTMLCanvasElement>>('canvasRef')

  ngOnInit(): void {
     console.log(this.canvasEl()?.nativeElement)
  }
}
