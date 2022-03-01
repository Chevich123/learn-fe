import { AbstractControl } from '@angular/forms';
export function ValidateUrl(control: AbstractControl) {
  if (!control.value.startsWith('https') || !control.value.includes('.com')) {
    return { invalidUrl: true };
  }
  return null;
}

export function ValidatePhone(control: AbstractControl) {
  if (!control.value.startsWith('+375') || control.value.includes['[a-zA-Z]*']) {
    return { invalidUrl: true };
  }
  return null;
}
