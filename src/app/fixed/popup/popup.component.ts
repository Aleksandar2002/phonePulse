import { Component, OnInit } from '@angular/core';
import { PopupControlService } from '../../services/popup-control.service';
import { IPopup } from './IPopup';

@Component({
  selector: 'phone-pulse-popup',
  templateUrl: './popup.component.html',
  styleUrl: './popup.component.scss',
})
export class PopupComponent implements OnInit {
  constructor(private popupService: PopupControlService) {}

  popupObj!: IPopup;
  timeout!: any;

  hidePopup() {
    this.popupService.hide();
  }

  ngOnInit(): void {
    this.popupService.popupSubject.subscribe((obj: IPopup) => {
      this.popupObj = obj;

      if (obj.isVisible == true) {
        this.timeout = setTimeout(() => {
          this.popupService.hide();
        }, 5000);
      }
      if (obj.isVisible == false) {
        clearTimeout(this.timeout);
      }
    });
  }
}
