import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GenericFormComponent } from './generic-form/generic-form.component';
import { TextFieldComponent } from './form-controls/text-field/text-field.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TableComponent } from './table/table.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [GenericFormComponent, TextFieldComponent, TableComponent],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule],
  exports: [GenericFormComponent, TextFieldComponent, TableComponent],
})
export class GenericsModule {}
