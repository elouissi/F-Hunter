import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function futureDateValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;
    if (value && new Date(value).getTime() <= new Date().getTime()) {
      return { futureDate: 'The date must be in the future' };
    }
    return null; // La validation réussit si la date est dans le futur
  };
}
