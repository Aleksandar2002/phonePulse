import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IFormField } from '../IFormField';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ValidatorFn,
} from '@angular/forms';
import { retry } from 'rxjs';

@Component({
  selector: 'phone-pulse-generic-form',
  templateUrl: './generic-form.component.html',
  styleUrl: './generic-form.component.scss',
})
export class GenericFormComponent implements OnInit {
  @Input() fields!: IFormField[];
  @Input() title!: string;
  @Input() formValidator: ValidatorFn | null = null;

  @Output() formSubmitEmitter: EventEmitter<any> = new EventEmitter<any>();

  form!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.form = this.fb.group(this.getFormGroupControlsFromFieldsArray, {
      validators: this.formValidator,
    });
  }

  getFieldValidationRules(
    field: IFormField
  ): (string | number | ValidatorFn[])[] {
    if (field.value) {
      return !field.validators
        ? [field.value]
        : [field.value, field.validators];
    }
    return !field.validators ? [''] : ['', field.validators];
  }

  get getFormGroupControlsFromFieldsArray(): { [key: string]: any[] } {
    let temp: { [key: string]: any[] } = {};

    this.fields.forEach((field) => {
      if (field.controlType == 'submit') return;
      temp[field.name] = this.getFieldValidationRules(field);
    });
    return temp;
  }

  onFormSubmit(): void {
    this.formSubmitEmitter.emit(this.form.value);
  }

  getFormControl(field: IFormField): FormControl {
    return this.form.get(field.name) as FormControl;
  }
}
