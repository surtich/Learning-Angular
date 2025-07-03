import { Component, ElementRef, OnInit, viewChild, input, OnDestroy } from '@angular/core';
import { fromEvent, tap, map, filter, Subscription } from 'rxjs';

@Component({
  selector: 'app-key-logger',
  imports: [],
  templateUrl: './key-logger.component.html',
  styleUrl: './key-logger.component.css',
})
export class KeyLoggerComponent implements OnInit, OnDestroy {
  input = viewChild<ElementRef>('keyContainer');
  numeric = input(false);
  keys = '';
  private loggerSub: Subscription | undefined;

  ngOnInit(): void {
    const logger$ = fromEvent<KeyboardEvent>(
      this.input()!.nativeElement,
      'keyup',
    );
    this.loggerSub = logger$
      .pipe(
        map((evt) => evt.key.charCodeAt(0)),
        filter((code) => {
          if (this.numeric()) {
            return (code > 31 && (code < 48 || code > 57)) === false;
          }
          return true;
        }),
        tap((digit) => (this.keys += String.fromCharCode(digit))),
      )
      .subscribe();
  }

  ngOnDestroy(): void {
    this.loggerSub?.unsubscribe();
  }
}
