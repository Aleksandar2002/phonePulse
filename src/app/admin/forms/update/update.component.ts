import { Component, OnInit } from '@angular/core';
import { IFormField } from '../../../generics/IFormField';
import { formFields } from '../formFields';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminPhonesService } from '../../../services/admin/phones.service';
import { PhonesService } from '../../../services/phones.service';
import { IPhone } from '../../../interfaces/IPhone';
import { IFormPhoneData } from '../IFormPhoneData';
import {
  transformFromFormPhoneDataToPhoneData,
  transformFromPhoneDataToFormPhoneData,
} from '../transferFunctions';
import { PopupControlService } from '../../../services/popup-control.service';
import { PopupService } from '@ng-bootstrap/ng-bootstrap/util/popup';

@Component({
  selector: 'phone-pulse-update',
  templateUrl: './update.component.html',
  styleUrl: './update.component.scss',
})
export class UpdateComponent implements OnInit {
  constructor(
    private activatedRoute: ActivatedRoute,
    private adminPhonesService: AdminPhonesService,
    private phonesService: PhonesService,
    private popupService: PopupControlService,
    private router: Router
  ) {}

  phone!: IFormPhoneData;
  phoneId!: string;
  formFields: IFormField[] = formFields;

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((param) => {
      if (param['id']) {
        this.phoneId = param['id'];
        this.phonesService.getPhone(this.phoneId).subscribe((phone: IPhone) => {
          if (phone) {
            this.phone = transformFromPhoneDataToFormPhoneData(phone);
            this.mapPhoneDataToFormFields();
          }
        });
      }
    });
  }

  mapPhoneDataToFormFields(): void {
    this.formFields.forEach((field) => {
      if (field.controlType == 'submit') {
        field.value = 'Update';
        return;
      }
      field.value = (this.phone as any)[field.name] ?? '';
    });
    console.log(this.formFields);
  }

  update(data: object): void {
    let phone: IPhone = transformFromFormPhoneDataToPhoneData(
      data as IFormPhoneData
    );
    this.adminPhonesService.updatePhone(phone, this.phoneId).subscribe(() => {
      this.popupService.show('Updated successfully', 'success');
      this.router.navigate(['/admin-page']);
    });
  }
}
