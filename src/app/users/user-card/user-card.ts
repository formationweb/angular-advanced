import { Component, effect, input, Input, output } from '@angular/core';
import { User } from '../users.service';

@Component({
  selector: 'app-user-card',
  imports: [],
  templateUrl: './user-card.html',
  styleUrl: './user-card.css',
})
export class UserCard {
  user = input.required<User>()
  onDelete = output<number>()
}
