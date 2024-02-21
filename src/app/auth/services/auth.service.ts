import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { registerRequestInterface } from '../types/registerRequest.interface';
import { Observable, map } from 'rxjs';
import { CurrentUserInterface } from '../../shared/types/currentUser.interface';
import { AuthStateInterface } from '../types/authState.interface';
import { environment } from '../../../environments/environment';
import { AuthResponseInterface } from '../types/authResponse.interface';
import { LoginRequestInterface } from '../types/loginRequest.interface';


@Injectable({
  providedIn: 'root',
})
export class AuthService {

  constructor(private http: HttpClient) {}

  getUser(response: AuthResponseInterface):CurrentUserInterface{
    return response.user;
  }

  getCurrentUser():Observable<CurrentUserInterface>{
    const url = environment.apiUrl + "/user";
    return this.http.get<AuthResponseInterface>(url).pipe(map(this.getUser));
  }

  register(data: registerRequestInterface): Observable<CurrentUserInterface> {
    const url = environment.apiUrl + '/users'
    return this.http.post<AuthResponseInterface>(url,data).pipe(map(this.getUser))
  }

  login(data: LoginRequestInterface):Observable<CurrentUserInterface>{
    const url = environment.apiUrl + '/users/login'
    return this.http.post<AuthResponseInterface>(url,data).pipe(map((r)=>r.user))
  }
}
