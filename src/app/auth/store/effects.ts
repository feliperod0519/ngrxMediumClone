import { createEffect,Actions,ofType } from "@ngrx/effects";
import { AuthService } from "../services/auth.service";
import { Inject, inject } from "@angular/core";
import { authActions } from "./actions";
import { catchError,map,of,switchMap, tap } from "rxjs";
import { CurrentUserInterface } from "../../shared/types/currentUser.interface";
import { HttpErrorResponse } from "@angular/common/http";
import { PersistanceService } from "../../shared/services/persistance.service";
import { Router } from "@angular/router";

export const registerEffect = createEffect((
    actions$ = inject(Actions),
    authService = inject(AuthService),
    persistanceService= inject(PersistanceService)
)=>{
    return actions$.pipe(
                            ofType(authActions.register),
                            switchMap(({request})=>{
                                return authService.register(request).pipe(
                                    map((currentUser:CurrentUserInterface)=>{
                                        //window.localStorage.setItem('acessToken',currentUser.token);//this is an alternate way
                                        persistanceService.set('acessToken',currentUser.token)
                                        return authActions.registerSuccess({currentUser})
                                    }),
                                    catchError((err:HttpErrorResponse)=>{
                                        return of(authActions.registerFailure({errors:err.error.errors}))
                                    })
                                )
                            }
                        )
    )
},{functional:true})

export const redirectAfterRegisterEffect = createEffect((
    actions$ = inject(Actions),
    router = inject(Router))=>{
        return actions$.pipe(
            ofType(authActions.registerSuccess),
            tap(()=>{
                router.navigateByUrl('/')
            })
        )
    },{functional:true, dispatch:false})
