import { Validators } from '@angular/forms';
import {
  ICustomValidationMessage,
  IFormField,
} from '../../generics/IFormField';

export const formFields: IFormField[] = [
  {
    name: 'model',
    id: 'tbModel',
    tagType: 'text',
    label: 'Model',
    controlType: 'text',
    validators: [
      Validators.required,
      Validators.pattern(/^[A-z][A-z0-9]{2,}$/),
    ],
  },
  {
    name: 'manufacturer',
    id: 'tbManufacturer',
    tagType: 'text',
    label: 'Manufacturer',
    controlType: 'text',
    validators: [
      Validators.required,
      Validators.pattern(/^[A-z][A-z0-9]{2,}$/),
    ],
  },
  {
    name: 'price',
    id: 'tbPrice',
    tagType: 'number',
    label: 'Price',
    controlType: 'text',
    validators: [
      Validators.required,
      Validators.pattern(/^\d+$/),
      Validators.min(1),
      Validators.max(9999),
    ],
    customValidationMessages: [
      {
        validationName: 'min',
        message: 'Must be greater than 1',
      } as ICustomValidationMessage,
      {
        validationName: 'max',
        message: 'Must be smaller than 10000',
      } as ICustomValidationMessage,
    ],
  },
  {
    name: 'discount',
    id: 'tbDiscount',
    tagType: 'number',
    label: 'Discount',
    controlType: 'text',
    validators: [
      Validators.required,
      Validators.pattern(/^\d+$/),
      Validators.min(0),
      Validators.max(100),
    ],
    customValidationMessages: [
      {
        validationName: 'min',
        message: 'Must be greater than 0',
      } as ICustomValidationMessage,
      {
        validationName: 'max',
        message: 'Must be smaller than 100',
      } as ICustomValidationMessage,
    ],
  },
  {
    name: 'image',
    id: 'tbImage',
    tagType: 'text',
    label: 'Image',
    controlType: 'text',
    validators: [Validators.required, Validators.pattern(/^.+$/)],
  },
  {
    name: 'ram',
    id: 'tbRam',
    tagType: 'number',
    label: 'RAM',
    controlType: 'text',
    validators: [
      Validators.required,
      Validators.pattern(/^\d+$/),
      Validators.min(0),
      Validators.max(128),
    ],
    customValidationMessages: [
      {
        validationName: 'min',
        message: 'Must be greater than 1',
      } as ICustomValidationMessage,
      {
        validationName: 'max',
        message: 'Must be smaller than 129',
      } as ICustomValidationMessage,
    ],
  },
  {
    name: 'battery',
    id: 'tbBam',
    tagType: 'number',
    label: 'Battery',
    controlType: 'text',
    validators: [
      Validators.required,
      Validators.pattern(/^\d+$/),
      Validators.min(500),
      Validators.max(10000),
    ],
    customValidationMessages: [
      {
        validationName: 'min',
        message: 'Must be greater than 500',
      } as ICustomValidationMessage,
      {
        validationName: 'max',
        message: 'Must be smaller than 10001',
      } as ICustomValidationMessage,
    ],
  },
  {
    name: 'screen',
    id: 'tbScreen',
    tagType: 'number',
    label: 'Screen',
    controlType: 'text',
    validators: [
      Validators.required,
      Validators.pattern(/^\d+$/),
      Validators.min(1),
      Validators.max(100),
    ],
    customValidationMessages: [
      {
        validationName: 'min',
        message: 'Must be greater than 1',
      } as ICustomValidationMessage,
      {
        validationName: 'max',
        message: 'Must be smaller than 101',
      } as ICustomValidationMessage,
    ],
  },
  {
    name: 'camera',
    id: 'tbCamera',
    tagType: 'number',
    label: 'Camera',
    controlType: 'text',
    validators: [
      Validators.required,
      Validators.pattern(/^\d+$/),
      Validators.min(1),
      Validators.max(500),
    ],
    customValidationMessages: [
      {
        validationName: 'min',
        message: 'Must be greater than 1',
      } as ICustomValidationMessage,
      {
        validationName: 'max',
        message: 'Must be smaller than 501',
      } as ICustomValidationMessage,
    ],
  },
  {
    name: 'adminBtn',
    id: 'adminBtn',
    value: '',
    controlType: 'submit',
  },
];
