import { ValidatorFn } from '@angular/forms';

export interface ICustomValidationMessage {
  message: string;
  validationName: string;
}

export interface IFormField {
  name: string;
  tagType?: string;
  value?: string | number;
  id: string;
  label?: string;
  controlType: string;
  validators?: ValidatorFn[];
  customValidationMessages?: ICustomValidationMessage[];
}
