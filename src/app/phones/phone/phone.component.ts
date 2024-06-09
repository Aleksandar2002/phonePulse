import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IPhone } from '../../interfaces/IPhone';
import { IUser } from '../../interfaces/UserInterface';

@Component({
  selector: 'phone-pulse-phone',
  templateUrl: './phone.component.html',
  styleUrl: './phone.component.scss',
})
export class PhoneComponent {
  @Input() phone!: IPhone;
  @Output() navigateToPhoneDetails: EventEmitter<string> =
    new EventEmitter<string>();

  emitNavigationToPhoneDetails() {
    this.navigateToPhoneDetails.emit(this.phone.id);
  }

  getPhoneImagePath(image: string): string {
    if (image.substring(0, 4) == 'http') {
      return image;
    }
    return `assets/images/phones/${image}.png`;
  }
}
