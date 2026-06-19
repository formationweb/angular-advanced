import { Component, effect, input, Input, output, ChangeDetectionStrategy } from '@angular/core';
import { User } from '../users.service';

@Component({
  selector: 'app-user-card',
  imports: [],
  templateUrl: './user-card.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './user-card.css',
})
export class UserCard {
  user = input.required<User>();
  onDelete = output<number>();
}
