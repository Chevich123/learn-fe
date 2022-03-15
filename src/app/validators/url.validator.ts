import { AbstractControl } from '@angular/forms';
export function ValidatePhone(control: AbstractControl) {
  if(control.value) {
    if (!control.value.startsWith('375') && !control.value.startsWith('380') && !control.value.startsWith('7')) {
      return { invalidPhone: true };
    }

    if((control.value.startsWith('7') && control.value.length != 11) && control.value != 12) {
      return { invalidLength: true };
    }

    const accountRgEx: RegExp = /[0-9]/
    if(!accountRgEx.test(control.value)) {
      return { invalidPhone: true };
    }

  }
  return null;
}

export function ValidatePassword(control: AbstractControl) {
  const accountRgEx: RegExp = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).*$/
  if(control.value) {
    if(control.value.length < 8) {
      return { invalidLength: true };
    }
    if(!accountRgEx.test(control.value) && control.value) {
      return { invalidPassword: true };
    }
  }
  return null;
}

export function ValidateEmail(control: AbstractControl) {
  const accountRgEx: RegExp = /^[-\w.]+@([A-z0-9][-A-z0-9]+\.)+[A-z]{2,4}$/
  if(!accountRgEx.test(control.value) && control.value) {
    return { invalidEmail: true };
  }
  return null;
}

export function ValidateName(control: AbstractControl) {
  const accountRgEx: RegExp = /^[a-zA-Z][a-zA-Z0-9-_\.]{1,20}$/
  if(control.value) {
    if(control.value.length > 20) {
      return { toLong: true };
    }
    if(control.value.length < 2) {
      return { toShort: true };
    }
    if(!accountRgEx.test(control.value) && control.value) {
      return { invalidName: true };
    }
  }
  return null;
}

export function ValidateUrl(control: AbstractControl) {
  const accountRgEx: RegExp = /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)/;
  if(!control.value || !accountRgEx.test(control.value)) {
    return { invalidName: true };
  }
  return null;
}
