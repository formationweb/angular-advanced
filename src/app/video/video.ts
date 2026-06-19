import { AsyncPipe } from '@angular/common';
import {
  Component,
  DestroyRef,
  ElementRef,
  inject,
  OnInit,
  viewChild,
  ChangeDetectionStrategy,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { BehaviorSubject, fromEvent, map, merge, Subject } from 'rxjs';

@Component({
  selector: 'app-video',
  imports: [AsyncPipe],
  changeDetection: ChangeDetectionStrategy.Eager,
  template: `
    <video #videoRef width="400px" controls>
      <source src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4" />
    </video>
    <button (click)="togglePlay$.next()">
      {{ (isPlaying$ | async) ? 'Playing' : 'Pause' }}
    </button>
  `,
})
export class Video implements OnInit {
  private destroyRef = inject(DestroyRef);
  videoEl = viewChild<ElementRef<HTMLVideoElement>>('videoRef');
  isPlaying$ = new BehaviorSubject(false);
  togglePlay$ = new Subject<void>();

  ngOnInit(): void {
    const video = this.videoEl()?.nativeElement;
    if (!video) return;
    merge(
      fromEvent(video, 'play').pipe(map(() => true)),
      fromEvent(video, 'pause').pipe(map(() => false)),
    )
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((bool) => {
        this.isPlaying$.next(bool);
      });
    this.togglePlay$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(() => {
      this.isPlaying$.value ? video.pause() : video.play();
    });
  }
}
