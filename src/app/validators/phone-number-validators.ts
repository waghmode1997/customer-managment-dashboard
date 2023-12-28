import { AbstractControl, ValidatorFn, Validators } from '@angular/forms';

export function PhoneNumberValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const value = control.value;
    const isValid = /^\d+$/.test(value); // Check if it contains only numbers

    return isValid ? null : { 'phoneNumber': { value } };
  };
}
