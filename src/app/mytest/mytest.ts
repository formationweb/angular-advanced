import { Component, signal } from '@angular/core';

@Component({
  imports: [],
  selector: 'app-mytest',
  styleUrl: './mytest.css',
  templateUrl: './mytest.html',
})
export class Mytest {
  title = signal('Mon App')
}
