import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PhonesService } from '../../services/phones.service';
import { catchError, of, Subscription } from 'rxjs';
import { IPhone } from '../../interfaces/IPhone';

@Component({
  selector: 'phone-pulse-phone-details',
  templateUrl: './phone-details.component.html',
  styleUrl: './phone-details.component.scss',
})
export class PhoneDetailsComponent implements OnInit, OnDestroy {
  subscriptions: Subscription[] = [];
  phone!: IPhone;

  constructor(
    private activatedRoute: ActivatedRoute,
    private service: PhonesService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.subscriptions.push(
      this.activatedRoute.params.subscribe((data) => {
        this.getPhoneWithGivenId(data['id']);
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }

  getPhoneWithGivenId(id: string) {
    this.subscriptions.push(
      this.service
        .getPhone(id)
        .pipe(
          catchError((err) => {
            this.router.navigate(['/not-found']);
            return of(err);
          })
        )
        .subscribe((data) => {
          this.phone = data;
        })
    );
  }
}
