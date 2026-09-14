import { Component, input, Input } from '@angular/core';
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
}
