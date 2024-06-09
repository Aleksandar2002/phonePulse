import { Component } from '@angular/core';
import { IFormField } from '../../generics/IFormField';
import { Validators } from '@angular/forms';
import { passwordMatchingValidator } from './passwordMatchingValidator';
import { AuthorizationService } from '../../services/authorization.service';
import {
  IUser,
  IUserRegistrationFormData,
} from '../../interfaces/UserInterface';
import { ActivatedRoute, Router } from '@angular/router';
import { PopupControlService } from '../../services/popup-control.service';

@Component({
  selector: 'phone-pulse-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  constructor(
    private authService: AuthorizationService,
    private router: Router,
    private popupService: PopupControlService
  ) {}

  passwordsValidator = passwordMatchingValidator(
    'tbPassword',
    'tbConfirmPassword'
  );

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
      name: 'email',
      id: 'tbEmail',
      tagType: 'text',
      label: 'Email',
      controlType: 'text',
      validators: [
        Validators.required,
        Validators.pattern(/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/),
      ],
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
      name: 'confirmPassword',
      id: 'tbConfirmPassword',
      tagType: 'password',
      label: 'Confirm password',
      controlType: 'text',
      validators: [
        Validators.required,
        Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/),
      ],
    },
    {
      name: 'registerBtn',
      id: 'registerBtn',
      value: 'Register',
      controlType: 'submit',
    },
  ];

  handleFormSubmit(formData: object) {
    let temp: IUserRegistrationFormData = formData as IUserRegistrationFormData;

    let user: IUser = {
      username: temp.username,
      email: temp.email,
      password: temp.password,
      id: temp.id,
      role: 'user',
      cart: [],
      orders: [],
    };

    this.authService.register(user).subscribe(
      () => {
        this.popupService.show(
          'Your account is created successfully',
          'success'
        );
        this.router.navigateByUrl('/login');
      },
      (err) => {
        this.popupService.show('Some error', 'error');
      }
    );
  }
}
