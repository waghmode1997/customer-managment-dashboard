import { AbstractControl } from '@angular/forms';

export function EmailValidator(control: AbstractControl) {
  const emailRegEx = /^\b[A-Z0-9._-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b$/iu;
  if (!emailRegEx.test(control.value)) {
    return { emailValidator: true };
  }
  return null;
}