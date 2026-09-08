import { Component, effect, input, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { User } from '../../core/interfaces/user';

@Component({
  imports: [],
  selector: 'app-user-card',
  template: `
      <h1>{{ user().name }}</h1>
      <span>{{ user().email }}</span>
  `
})
export class UserCard {
  user = input.required<User>()

  // constructor() {
  //   effect(() => {
  //     console.log(this.user())
  //   })
  // }
}
