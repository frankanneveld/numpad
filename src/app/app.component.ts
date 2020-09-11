import { Component } from '@angular/core';
import { Observable, of, BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-root',
  styleUrls: ['./app.component.scss'],
  template:`<h2>NumPad</h2>
            <div class="result">{{(result$ | async)}}</div>
            <hr>
            <div class="numpad">
              <div *ngFor="let item of items$ | async">
                <div class="item" (click)="onClick(item)">{{item}}</div>
              </div>
              <div class="item" (click)="calculate()">=</div>
              <div class="item" (click)="result$.next('')">C</div>
            </div>`})
export class AppComponent {
  private num: string[] = [...Array(10)].toString().split(',').map( (r,i) => r + i);
  public items$: Observable<string[]> = of([...this.num, '-', '+', '/', '*']);
  public result$: BehaviorSubject<string> = new BehaviorSubject<string>('');

  public onClick(item: string): void {
    this.result$.next(this.result$.value + item);
  }

  public calculate(): void {
    const calc = this.result$.value;
    try {
      const output = eval(calc.toString());
      this.result$.next(String(output)); // Prevent TypeError on output if null or undefined
    } catch (err) {
      this.result$.next('');
    }
  }
}
