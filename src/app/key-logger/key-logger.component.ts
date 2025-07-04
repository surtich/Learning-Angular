import { AsyncPipe } from '@angular/common';
import { Component, ElementRef, OnInit, viewChild, input } from '@angular/core';
import { fromEvent, map, filter, Observable, scan } from 'rxjs';

@Component({
  selector: 'app-key-logger',
  imports: [AsyncPipe],
  templateUrl: './key-logger.component.html',
  styleUrl: './key-logger.component.css',
})
export class KeyLoggerComponent implements OnInit {
  input = viewChild<ElementRef>('keyContainer'); 
  numeric = input(false);
  key$: Observable<string> | undefined;

  ngOnInit(): void {
    const logger$ = fromEvent<KeyboardEvent>(
      this.input()!.nativeElement,
      'keyup',
    );
    this.key$ = logger$.pipe(
      map((evt) => evt.key.charCodeAt(0)),
      filter((code) => {
        if (this.numeric()) {
          return (code > 31 && (code < 48 || code > 57)) === false;
        }
        return true;
      }),
      map((digit) => String.fromCharCode(digit)),
      scan((acc, curr) => acc + curr, ''), // <-- Acumula las teclas presionadas
    );
  }
}
