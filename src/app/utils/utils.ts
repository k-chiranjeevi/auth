import { AbstractControl, ValidationErrors } from "@angular/forms";

export function passwordValidator(control: AbstractControl): ValidationErrors | null {
    const password = control.value;
    const capitalLetter = /(?=.*[A-Z])/.test(password);
    const hasSpecialCharacter = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    const hasNumber = /^(?=.*\d)/.test(password);

    if (!capitalLetter && password.length > 0) return { capsChar: true };
    if (!hasSpecialCharacter && password.length > 0) return { spclChar: true };
    if (!hasNumber && password.length > 0) return { numberChar: true };
    if (password.length > 0 && password.length < 6) return { passLen: true };
    return null;
}


export function phoneNumberValidator(control: AbstractControl): ValidationErrors | null {
    const phoneNumberRegex = /^[6-9]\d{9}$/;
    const value = control.value;
  
    if (!(/^\d+$/.test(value)) && value) return { 'enterNumbersOnly': true }
  
    if (value && !phoneNumberRegex.test(value)) {
      return { 'invalidNumber': true };
    }
  
    return null;
  };
  