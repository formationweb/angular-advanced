import { Component, effect, input, Input, OnChanges, output, SimpleChanges } from '@angular/core';
import { User } from '../user';

@Component({
  imports: [],
  selector: 'app-user-card',
  styleUrl: './user-card.css',
  templateUrl: './user-card.html',
})
export class UserCard {
  //@Input() user: User = {} as User
  user = input.required<User>()
  onDelete = output<number>()

  constructor() {
    effect(() => {
      //console.log(this.user())
    })
  }
}
