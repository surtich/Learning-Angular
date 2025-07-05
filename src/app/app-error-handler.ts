import { HttpErrorResponse, HttpStatusCode } from '@angular/common/http';
import { ErrorHandler, Injectable } from '@angular/core';

@Injectable()
export class AppErrorHandler implements ErrorHandler {
  handleError(error: any): void {
    /*
    Verificamos si el objeto de error contiene una propiedad `rejection`.
    Los errores que se originan en la librería `Zone.js`, que es responsable de la detección
    de cambios en Angular, encapsulan el error real dentro de esa propiedad.
    */
    const err = error.rejection || error;
    let message = '';

    if (err instanceof HttpErrorResponse) {
      switch (err.status) {
        /*
        Un error con un estado de 0 indica que es un error que ocurrió en el lado del cliente
        de la aplicación.
        */
        case 0:
          message = 'Client error';
          break;
        case HttpStatusCode.InternalServerError:
          message = 'Server error';
          break;
        case HttpStatusCode.BadRequest:
          message = 'Request error';
          break;
        default:
          message = 'Unknown error';
      }
    } else {
      message = 'Application error';
    }

    console.error(message, err);
  }
}
