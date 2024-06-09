import { Injectable } from '@angular/core';
import { IPopup } from '../fixed/popup/IPopup';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PopupControlService {
  popupObject!: IPopup;

  popupSubject: Subject<IPopup> = new Subject<IPopup>();

  constructor() {
    this.popupObject = {
      isVisible: false,
      message: '',
      popupClass: '',
    };
    this.notifyObservers();
  }

  show(message: string, _class: string): void {
    this.hide();
    this.popupObject = {
      message: message,
      popupClass: _class,
      isVisible: true,
    };

    this.notifyObservers();
  }

  toggle(): void {
    this.popupObject.isVisible = !this.popupObject.isVisible;
    this.notifyObservers();
  }

  hide(): void {
    this.popupObject.isVisible = false;
    this.notifyObservers();
  }

  notifyObservers() {
    this.popupSubject.next(this.popupObject);
  }
}
