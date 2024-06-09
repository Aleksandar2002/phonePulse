import { Component, Input } from '@angular/core';

@Component({
  selector: 'phone-pulse-banner',
  templateUrl: './banner.component.html',
  styleUrl: './banner.component.scss',
})
export class BannerComponent {
  @Input() image!: string;
  @Input() title!: string;
  @Input() text!: string;
}
