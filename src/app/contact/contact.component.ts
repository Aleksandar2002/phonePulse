import { Component } from '@angular/core';
import { IFormField } from '../generics/IFormField';
import { Validators } from '@angular/forms';

@Component({
  selector: 'phone-pulse-contact',
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent {
  fields: IFormField[]=  [
    {
      name: 'message',
      id: 'tbMessage',
      tagType: 'text',
      label: 'Message',
      controlType: 'text',
      validators: [
        Validators.required,
        Validators.pattern(/^[A-z0-9-_\.\/\,\;\:\s]{2,}$/),
      ],
    },
    {
      name: 'contactBtn',
      id: 'contactBtn',
      value: 'Contact',
      controlType: 'submit',
    },
  ]

  handleContactSubmit(data:object){
    console.log(data);
    
  }
}
