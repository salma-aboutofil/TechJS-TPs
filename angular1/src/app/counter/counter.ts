import { Component, Input} from '@angular/core';

@Component({
  selector: 'app-counter',
  standalone: true,
  template: `
    <h2>Counter Value: {{ count }}</h2>

    <button (click)="increment()">Increment</button>
    <button (click)="decrement()">Decrement</button>
    <button (click)="reset()">Reset</button>
  `,
})
export class Counter {
  @Input() count: count= 0;

  increment() {
    this.count++;
  }

  decrement() {
    this.count--;
  }

  reset() {
    this.count = 0;
  }
}
