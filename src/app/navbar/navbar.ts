import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UsersService } from '../users/users.service';

@Component({
  selector: 'app-navbar',
  imports: [FormsModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {
  private usersService = inject(UsersService)
  protected readonly searchValue = this.usersService.searchValue
}
