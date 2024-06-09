import { Component, OnDestroy, OnInit } from '@angular/core';
import { IFormField } from '../../generics/IFormField';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  Validators,
} from '@angular/forms';
import {
  IUser,
  IUserLoginCredentials,
  IUserLoginFormData,
} from '../../interfaces/UserInterface';
import { AuthorizationService } from '../../services/authorization.service';
import { Router } from '@angular/router';
import { PopupControlService } from '../../services/popup-control.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'phone-pulse-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnDestroy {
  subscriptions: Subscription[] = [];

  constructor(
    private authService: AuthorizationService,
    private router: Router,
    private popupService: PopupControlService
  ) {}

  formFields: IFormField[] = [
    {
      name: 'username',
      id: 'tbUsername',
      tagType: 'text',
      label: 'Username',
      controlType: 'text',
      validators: [Validators.required, Validators.pattern(/^[\w\S]{6,}$/)],
    },
    {
      name: 'password',
      id: 'tbPassword',
      tagType: 'password',
      label: 'Password',
      controlType: 'text',
      validators: [
        Validators.required,
        Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/),
      ],
    },
    {
      name: 'loginBtn',
      id: 'loginBtn',
      value: 'Login',
      controlType: 'submit',
    },
  ];

  login(formData: object): void {
    let temp: IUserLoginFormData = formData as IUserLoginFormData;

    let user: IUserLoginCredentials = {
      username: temp.username,
      password: temp.password,
    };

    this.subscriptions.push(
      this.authService.login(user).subscribe((user: IUser | null) => {
        if (!user) {
          this.popupService.show('Invalid credentials', 'error');
          return;
        }

        localStorage.setItem('LOGGED_USER', JSON.stringify(user));
        this.popupService.hide();
        if (user.role == 'user') this.router.navigateByUrl('/phones');
        if (user.role == 'admin') this.router.navigateByUrl('/admin-page');
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }

  // constructor(private fb: FormBuilder) {}

  // form!: FormGroup;

  // ngOnInit(): void {
  //   this.form = this.fb.group({
  //     username: ['', [Validators.required, Validators.pattern(/^[\w\S]{6,}$/)]],
  //     password: [
  //       '',
  //       [
  //         Validators.required,
  //         Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/),
  //       ],
  //     ],
  //   });
  // }

  // onFormSubmit() {
  //   console.log(this.form.value);
  // }
}
