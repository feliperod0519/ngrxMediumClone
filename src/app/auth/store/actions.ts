import { createActionGroup, props } from '@ngrx/store';
import { registerRequestInterface } from '../types/registerRequest.interface';
import { CurrentUserInterface } from '../../shared/types/currentUser.interface';
import { BackendErrorsInterface } from '../types/backendErrors';

// export const register = createAction(
//   '[Auth] Register',
//   props<{ request: registerRequestInterface }>()
// );

export const authActions = createActionGroup({
    source: 'auth',
    events : {
        Register: props<{ request: registerRequestInterface }>(),
        'Register Success': props<{currentUser:CurrentUserInterface}>(),
        'Register failure': props<{errors:BackendErrorsInterface}>()
    }
})