import { Component, ElementRef, OnInit, viewChild, input, inject, DestroyRef } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { fromEvent, tap, map, filter } from 'rxjs';

@Component({
  selector: 'app-key-logger',
  imports: [],
  templateUrl: './key-logger.component.html',
  styleUrl: './key-logger.component.css',
})
export class KeyLoggerComponent implements OnInit {
  input = viewChild<ElementRef>('keyContainer');
  numeric = input(false);
  keys = '';
  private destroyRef = inject(DestroyRef);

  ngOnInit(): void {
    const logger$ = fromEvent<KeyboardEvent>(
      this.input()!.nativeElement,
      'keyup',
    );
    logger$
      .pipe(
        map((evt) => evt.key.charCodeAt(0)),
        filter((code) => {
          if (this.numeric()) {
            return (code > 31 && (code < 48 || code > 57)) === false;
          }
          return true;
        }),
        tap((digit) => (this.keys += String.fromCharCode(digit))),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe();
  }
}
