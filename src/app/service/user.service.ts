import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Environment } from 'src/environments/environment-prod';
import { SignUpUserRequest } from '../models/interfaces/user/SignUpUserRequest';
import { Observable } from 'rxjs';
import { SignUpUserResponse } from '../models/interfaces/user/SignUpUserResponse';
import { AuthRequest } from '../models/interfaces/user/AuthRequest';
import { AuthResponse } from '../models/interfaces/user/AuthResponse';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  
  private API_URL = Environment.API_URL;

  constructor(private http: HttpClient, private cookieService: CookieService) { }

  createUser(requestData: SignUpUserRequest): Observable<SignUpUserResponse>{
    return this.http.post<SignUpUserResponse>(`${this.API_URL}/user`, requestData);
  }

  authUser(requestData: AuthRequest): Observable<AuthResponse>{
    return this.http.post<AuthResponse>(`${this.API_URL}/auth`, requestData);
  }

  isLoggedIn(): boolean {
    return this.cookieService.get("token") ? true : false;
  }

}
