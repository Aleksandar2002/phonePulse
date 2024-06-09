import { AbstractControl, ValidatorFn, ValidationErrors } from '@angular/forms';

export function passwordMatchingValidator(
  pass: string,
  confirm: string
): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const passValue = control.get(pass)?.value;
    const confirmValue = control.get(confirm)?.value;

    if (passValue !== confirmValue) {
      return { passwordMatching: true };
    }

    return null;
  };
}
