import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { registerRequestInterface } from '../types/registerRequest.interface';
import { CurrentUserInterface } from '../../shared/types/currentUser.interface';
import { BackendErrorsInterface } from '../types/backendErrors';
import { LoginRequestInterface } from '../types/loginRequest.interface';
import {CurrentUserRequestInterface} from '../../../app/shared/types/currentUserRequest.interface'

// export const register = createAction(
//   '[Auth] Register',
//   props<{ request: registerRequestInterface }>()
// );

export const authActions = createActionGroup({
    source: 'auth',
    events : {
        Register: props<{ request: registerRequestInterface }>(),
        'Register Success': props<{currentUser:CurrentUserInterface}>(),
        'Register failure': props<{errors:BackendErrorsInterface}>(),

        Login: props<{ request: LoginRequestInterface }>(),
        'Login Success': props<{currentUser:CurrentUserInterface}>(),
        'Login failure': props<{errors:BackendErrorsInterface}>(),

        'Get Current User': emptyProps(),
        'Get Current User Success': props<{currentUser:CurrentUserInterface}>(),
        'Get Current User failure': emptyProps(),

        'Update current user': props<{
            currentUserRequest: CurrentUserRequestInterface
          }>(),
          'Update current user success': props<{currentUser: CurrentUserInterface}>(),
          'Update current user failure': props<{errors: BackendErrorsInterface}>(),
      
          Logout: emptyProps(),
    }
})