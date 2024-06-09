import { Component, EventEmitter, Output } from '@angular/core';
import { IPhonesQueryParams } from '../../interfaces/IPhonesQueryParams';

@Component({
  selector: 'phone-pulse-search',
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss',
})
export class SearchComponent {
  searchText!: string;
  @Output() searchTextEmitter: EventEmitter<IPhonesQueryParams> =
    new EventEmitter<IPhonesQueryParams>();

  handleInputEvent(): void {
    this.searchTextEmitter.emit({
      keyword: this.searchText,
    } as IPhonesQueryParams);
  }
}
