import { Injectable } from '@angular/core';
import { IUser, IUserLoginCredentials } from '../interfaces/UserInterface';
import { HttpClient } from '@angular/common/http';
import { map, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthorizationService {
  constructor(private http: HttpClient) {
    this.setUserFromLocalStorage();
  }
  baseUrl: string = 'http://localhost:3000/users';

  private loggedUser: null | IUser = null;
  loggedUserSubject: Subject<null | IUser> = new Subject<null | IUser>();

  setUserFromLocalStorage() {
    console.log('authservice');

    setTimeout(() => {
      let userFromStorage = JSON.parse(
        localStorage.getItem('LOGGED_USER') as string
      );
      this.LoggedUser = userFromStorage ? userFromStorage : null;
      this.notifyObservers();
    }, 0);
  }

  login(user: IUserLoginCredentials): Observable<IUser | null> {
    return this.http.get<IUser[]>(this.baseUrl).pipe(
      map((value: IUser[]) => {
        let users: IUser[] = value.filter((u: IUser) => {
          if (u.username == user.username && u.password == user.password) {
            return true;
          }
          return false;
        });

        if (users.length != 1) {
          return null;
        }

        this.LoggedUser = users[0];
        return users[0];
      })
    );
  }

  get LoggedUser(): IUser | null {
    return this.loggedUser;
  }

  set LoggedUser(user: IUser) {
    this.loggedUser = user;
    this.notifyObservers();
  }

  register(user: IUser): Observable<IUser> {
    return this.http.post<IUser>(this.baseUrl, user);
  }

  logout() {
    this.loggedUser = null;
    this.notifyObservers();
  }

  notifyObservers(): void {
    this.loggedUserSubject.next(this.loggedUser);
  }
}
