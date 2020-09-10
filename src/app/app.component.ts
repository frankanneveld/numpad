import { Component } from '@angular/core';
import { Observable, of, BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public items$: Observable<string[]> = of(['1', '2', '3', '4', '5' , '6', '7', '8', '9', '-', '0' ,'+']);
  public result$: BehaviorSubject<string> = new BehaviorSubject<string>('');

  public onClick(item: string): void {
    this.result$.next(this.result$.value + item);
  }

  public calculate(): void {
    const calc = this.result$.value;
    const output = eval(calc.toString());
    this.result$.next(output);
  }
}
