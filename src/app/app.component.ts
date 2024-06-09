import { AfterViewInit, Component, OnInit } from '@angular/core';
import { AuthorizationService } from './services/authorization.service';
import { IUser } from './interfaces/UserInterface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements AfterViewInit {
  constructor(private authService: AuthorizationService) {}

  ngAfterViewInit(): void {
    // setTimeout(() => {
    //   let userFromStorage: IUser | null = JSON.parse(
    //     localStorage.getItem('LOGGED_USER') as string
    //   );
    //   if (userFromStorage) {
    //     this.authService.LoggedUser = userFromStorage;
    //   }
    // }, 0);
  }
}
