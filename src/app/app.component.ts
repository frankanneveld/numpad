import { Component } from '@angular/core';
import { Observable, of, BehaviorSubject, timer } from 'rxjs';
import { distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
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
