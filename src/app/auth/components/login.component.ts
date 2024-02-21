import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
//import { register } from '../store/actions'; // before creating effects;
import { authActions } from '../store/actions';
import { RouterLink } from '@angular/router';
import { registerRequestInterface } from '../types/registerRequest.interface';
import { selectIsSubmitting, selectValidationErrors } from '../store/reducers';
import { AuthStateInterface } from '../types/authState.interface';
import { CommonModule } from '@angular/common';
import { AuthService } from '../services/auth.service';
import { combineLatest } from 'rxjs';
import { BackendErrorMessages } from '../../shared/components/backendErrorMessages/backendErrorMessages.component';
import { LoginRequestInterface } from '../types/loginRequest.interface';

@Component({
  selector: 'mc-login',
  templateUrl: './login.component.html',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, CommonModule, BackendErrorMessages],
})
export class LoginComponent {
  myForm = this.fb.nonNullable.group({
    email: ['', Validators.required],
    password: ['', Validators.required],
  });

  // isSubmitting$ = this.store.select(selectIsSubmitting);
  // backendErrors$ = this.store.select(selectValidationErrors);
  data$ = combineLatest({
    isSubmitting: this.store.select(selectIsSubmitting),
    backendErrors: this.store.select(selectValidationErrors)
  });

  constructor(
    private fb: FormBuilder,
    private store: Store<{ auth: AuthStateInterface }>,
    private authService: AuthService
  ) {}

  onSubmit() {
    console.log('form', this.myForm.getRawValue());
    const request: LoginRequestInterface = {
      user: this.myForm.getRawValue(),
    };
    //this.store.dispatch(register({ request: request }));// before creating effects;
    this.store.dispatch(authActions.login({ request: request }));
    //only for testing
    this.authService.login(request).subscribe((r) => console.log('r', r));
  }
}
