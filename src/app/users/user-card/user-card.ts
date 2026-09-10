import { Component, contentChild, effect, ElementRef, input, Input, OnChanges, OnInit, output, SimpleChanges } from '@angular/core';
import { User } from '../../core/interfaces/user';

@Component({
  imports: [],
  selector: 'app-user-card',
  template: `
      <ng-content select="header" />
      <h1>{{ user().name }}</h1>
      <span>{{ user().email }}</span>
      <ng-content select="footer" />
      <button (click)="onDelete.emit(user().id)">Supprimer</button>
      <hr />
  `
})
export class UserCard {
  user = input.required<User>()
  onDelete = output<number>()
  headerEl = contentChild<ElementRef<HTMLElement>>('headerRef')

  constructor() {
    effect(() => {
      console.log(this.headerEl()?.nativeElement)
    })
  }

  // constructor() {
  //   effect(() => {
  //     console.log(this.user())
  //   })
  // }
}
