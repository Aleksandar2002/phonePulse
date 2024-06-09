import { Component, OnInit } from '@angular/core';
import { AuthorizationService } from '../../services/authorization.service';
import { IUser } from '../../interfaces/UserInterface';
import { Router } from '@angular/router';

@Component({
  selector: 'phone-pulse-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit {
  constructor(
    private authService: AuthorizationService,
    private router: Router
  ) {}

  loggedUser: IUser | null = null;

  ngOnInit(): void {
    this.authService.loggedUserSubject.subscribe((user: IUser | null) => {
      this.loggedUser = user;
    });
  }

  logoutEvent() {
    this.authService.logout();
    localStorage.removeItem('LOGGED_USER');

    let onlyAuthorizedCanAccess: string[] = [
      'cart',
      'admin-page',
      'create',
      'edit',
    ];

    let splittedUrl = this.router.url.split('/');
    let currentPage = splittedUrl[splittedUrl.length - 1];

    console.log(currentPage);

    if (onlyAuthorizedCanAccess.includes(currentPage)) {
      this.router.navigate(['/phones']);
    }
  }
}
