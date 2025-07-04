import { ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';

export function priceMaximumValidator(price: number): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const isMax = control.value <= price;
    /*
    La clave del objeto de error de validación especifica un nombre descriptivo
    para el error del validador. Es un nombre que se puede verificar
    posteriormente con el método `hasError` del control para averiguar si
    tiene algún error. El valor del objeto de error de validación puede ser
    cualquier valor arbitrario que se pueda pasar en el mensaje de error.
    */
    return isMax ? null : { priceMaximum: true };
  };
}
