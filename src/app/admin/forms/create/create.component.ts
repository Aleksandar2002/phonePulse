import { Component, OnInit } from '@angular/core';
import { IFormField } from '../../../generics/IFormField';
import { Validators } from '@angular/forms';
import { formFields } from '../formFields';
import { IPhone } from '../../../interfaces/IPhone';
import { AdminPhonesService } from '../../../services/admin/phones.service';
import { PopupControlService } from '../../../services/popup-control.service';
import { Router } from '@angular/router';
import { IFormPhoneData } from '../IFormPhoneData';
import { transformFromFormPhoneDataToPhoneData } from '../transferFunctions';

@Component({
  selector: 'phone-pulse-create',
  templateUrl: './create.component.html',
  styleUrl: './create.component.scss',
})
export class CreateComponent implements OnInit {
  constructor(
    private adminPhoneService: AdminPhonesService,
    private popupService: PopupControlService,
    private router: Router
  ) {}

  formFields: IFormField[] = formFields;

  ngOnInit(): void {
    this.formFields[this.formFields.length - 1].value = 'Create';
  }

  create(data: IFormPhoneData): void {
    let phone: IPhone = transformFromFormPhoneDataToPhoneData(
      data as IFormPhoneData
    );

    this.adminPhoneService.addPhone(phone).subscribe(() => {
      this.router.navigate(['/admin-page']);
      this.popupService.show('Data is created successfully', 'success');
    });
  }
}
