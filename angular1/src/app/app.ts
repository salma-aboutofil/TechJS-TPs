import { Component, signal, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Counter } from './counter/counter';

  @Component({
  selector: 'app-root',
  standalone: true,
  imports: [Counter, RouterOutlet],
  template: `
    <app-counter [count]="2"></app-counter>
    
  `,
})
export class App implements OnInit {
  protected readonly title = signal('angular1');

  ngOnInit(): void {
    console.log('bonjour');
  }
}
