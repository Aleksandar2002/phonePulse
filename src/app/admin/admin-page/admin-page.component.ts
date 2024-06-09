import { Component, OnInit } from '@angular/core';
import { IPhone } from '../../interfaces/IPhone';
import { PhonesService } from '../../services/phones.service';
import { IPhoneDataForTable } from './IPhoneDataForTable';
import { AdminPhonesService } from '../../services/admin/phones.service';
import { PopupControlService } from '../../services/popup-control.service';

@Component({
  selector: 'phone-pulse-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrl: './admin-page.component.scss',
})
export class AdminPageComponent implements OnInit {
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

  ngOnInit(): void {
    this.getPhonesForTable();
  }

  getPhonesForTable(): void {
    this.phoneService.getPhones().subscribe((data: IPhone[]) => {
      if (data && data.length) {
        this.mapToTableData(data);
      }
    });
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
    this.adminPhonesService.deletePhone(id).subscribe(() => {
      this.getPhonesForTable();
      this.popupService.show('Phone is deleted successfully', 'success');
    });
  }
}
