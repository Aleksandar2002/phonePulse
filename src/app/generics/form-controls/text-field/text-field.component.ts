import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { IFormField } from '../../IFormField';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'phone-pulse-text-field',
  templateUrl: './text-field.component.html',
  styleUrl: './text-field.component.scss',
})
export class TextFieldComponent implements OnInit {
  @Input() field!: IFormField;
  @Input() control!: FormControl;

  @ViewChild('input', { static: true }) input!: ElementRef;
  @ViewChild('label', { static: true }) label!: ElementRef;

  ngOnInit(): void {
    if (this.field && this.field.value) {
      this.moveLabelUp();
    }
  }

  moveLabelUp() {
    this.label.nativeElement.classList.add('go-up');
  }
  moveLabelDown() {
    if (this.input.nativeElement.value) {
      return;
    }
    this.label.nativeElement.classList.remove('go-up');
  }
}
