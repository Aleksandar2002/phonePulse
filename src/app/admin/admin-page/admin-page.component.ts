import { Component, OnDestroy, OnInit } from '@angular/core';
import { IPhone } from '../../interfaces/IPhone';
import { PhonesService } from '../../services/phones.service';
import { IPhoneDataForTable } from './IPhoneDataForTable';
import { AdminPhonesService } from '../../services/admin/phones.service';
import { PopupControlService } from '../../services/popup-control.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'phone-pulse-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrl: './admin-page.component.scss',
})
export class AdminPageComponent implements OnInit, OnDestroy {
  constructor(
    private phoneService: PhonesService,
    private adminPhonesService: AdminPhonesService,
    private popupService: PopupControlService
  ) {}

  tableColumns: string[] = [
    'Name',
    'Image',
    'Price',
    'Discount',
    'Manufacturer',
    'Specification',
  ];
  columnsOrder: string[] = [
    'name',
    'image',
    'price',
    'discount',
    'manufacturer',
    'specification',
  ];

  phones!: IPhoneDataForTable[];
  subscriptions: Subscription[] = [];

  ngOnInit(): void {
    this.getPhonesForTable();
  }

  getPhonesForTable(): void {
    this.subscriptions.push(
      this.phoneService.getPhones().subscribe((data: IPhone[]) => {
        if (data && data.length) {
          this.mapToTableData(data);
        }
      })
    );
  }

  mapToTableData(data: IPhone[]): void {
    this.phones = data.map((phone) => {
      let { Battery, RAM, Camera, Screen } = phone.specification;
      return {
        id: phone.id,
        name: phone.name,
        image: phone.image,
        price: '$' + phone.price,
        discount: phone.discount + '%',
        manufacturer: phone.manufacturer.name,
        specification: `RAM: ${RAM}, Camera: ${Camera}, Battery: ${Battery}, Screen: ${Screen}`,
      } as IPhoneDataForTable;
    });
  }

  deleteData(id: string) {
    this.subscriptions.push(
      this.adminPhonesService.deletePhone(id).subscribe(() => {
        this.getPhonesForTable();
        this.popupService.show('Phone is deleted successfully', 'success');
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((u) => u.unsubscribe());
  }
}
