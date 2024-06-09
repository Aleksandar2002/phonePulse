import { Component, Input } from '@angular/core';

@Component({
  selector: 'phone-pulse-discount',
  templateUrl: './discount.component.html',
  styleUrl: './discount.component.scss',
})
export class DiscountComponent {
  @Input() discount!: string;
}
