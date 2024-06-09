import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  IBaseTableData,
  IPhoneDataForTable,
} from '../../admin/admin-page/IPhoneDataForTable';

@Component({
  selector: 'phone-pulse-table',
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
})
export class TableComponent {
  @Input() cols: string[] = [];
  @Input() data: IBaseTableData[] = [];
  @Input() colsOrder: string[] = [];
  @Input() title: string = 'Title';

  @Output() deleteEmitter: EventEmitter<string> = new EventEmitter<string>();

  showItemOfKeyValue(item: IBaseTableData, key: string): string {
    return (item as any)[key] as string;
  }

  getImagePath(image: string): string {
    if (image.substring(0, 4) == 'http') {
      return image;
    }
    return `assets/images/phones/${image}.png`;
  }

  handleDelete(id: string): void {
    this.deleteEmitter.emit(id);
  }
}
