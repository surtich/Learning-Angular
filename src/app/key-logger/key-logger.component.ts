import { Component, ElementRef, OnInit, viewChild, input } from '@angular/core';
import { fromEvent, tap } from 'rxjs';

@Component({
  selector: 'app-key-logger',
  imports: [],
  templateUrl: './key-logger.component.html',
  styleUrl: './key-logger.component.css',
})
export class KeyLoggerComponent implements OnInit {
  input = viewChild<ElementRef>('keyContainer'); // viewChild a la template reference variable #keyContainer
  numeric = input(false);
  keys = '';

  ngOnInit(): void {
    const logger$ = fromEvent<KeyboardEvent>(
      this.input()!.nativeElement, // Acceso al elemento nativo del DOM. viewChild devuelve un wrapper
      'keyup',
    );
    logger$.pipe(tap((evt) => (this.keys += evt.key))).subscribe(); // tap es similar a foreach en arrays
  }
}
