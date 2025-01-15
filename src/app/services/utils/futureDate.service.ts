import { AbstractControl, ValidatorFn } from '@angular/forms';
import { addDays, isBefore } from 'date-fns';

export function futureDate(minDays: number): ValidatorFn {
  return (control: AbstractControl) => {
    if (!control.value) {
      return null;
    }

    const currentDate = new Date();
    const inputDate = new Date(control.value);

    if (isBefore(inputDate, addDays(currentDate, minDays))) {
      return { futureDate: { message: `The date must be at least ${minDays} days in the future` } };
    }

    return null;
  };
}
