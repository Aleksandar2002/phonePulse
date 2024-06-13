import { Component, OnDestroy, OnInit } from '@angular/core';
import { IPhone } from '../interfaces/IPhone';
import { PhonesService } from '../services/phones.service';
import { Router } from '@angular/router';
import { IPhonesQueryParams } from '../interfaces/IPhonesQueryParams';
import { IUser } from '../interfaces/UserInterface';
import { AuthorizationService } from '../services/authorization.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'phone-pulse-phones',
  templateUrl: './phones.component.html',
  styleUrl: './phones.component.scss',
})
export class PhonesComponent implements OnInit, OnDestroy {
  phones: IPhone[] = [];
  getPhonesParams: IPhonesQueryParams | null = null;
  subscriptions: Subscription[] = [];

  constructor(private phonesService: PhonesService, private router: Router) {}

  ngOnInit(): void {
    this.getPhones();
  }
  ngOnDestroy(): void {
    this.subscriptions.forEach((s) => s.unsubscribe());
  }

  navigateToPhoneDetails(id: string): void {
    this.router.navigate(['/phones/' + id]);
  }

  getPhones() {
    this.subscriptions.push(
      this.phonesService
        .getPhones(this.getPhonesParams)
        .subscribe((phones: IPhone[]) => {
          this.phones = phones;
        })
    );
  }

  changeIPhoneQueryParams(queryParamsObj: IPhonesQueryParams) {
    this.getPhonesParams = { ...this.getPhonesParams, ...queryParamsObj };
    this.getPhones();
  }
}
