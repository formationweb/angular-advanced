import { AsyncPipe } from '@angular/common';
import { Component, DestroyRef, effect, ElementRef, inject, OnInit, signal, viewChild } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { BehaviorSubject, fromEvent, map, merge, Subject } from 'rxjs';

@Component({
  imports: [AsyncPipe],
  selector: 'app-video',
  template: `
    <video #vid width="400" controls 
      (play)="isPlaying.set(true)" 
      (pause)="isPlaying.set(false)">
      <source src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4" />
    </video>
    <button (click)="toggleVideo()">{{ isPlaying() ? 'Playing' : 'Pause' }}</button>
  `,
})
export class Video {
  videoEl = viewChild<ElementRef<HTMLVideoElement>>('vid');
  isPlaying = signal(false)

  toggleVideo() {
    const video = this.videoEl()?.nativeElement
    if (!video) return
    this.isPlaying() ? video.pause() : video.play()
    this.isPlaying.update(bool => !bool)
  }
}
