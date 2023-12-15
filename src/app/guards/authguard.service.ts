import { Injectable } from '@angular/core';
import { UserService } from '../service/user.service';
import { Observable } from 'rxjs';
import { Router, UrlTree } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthguardService {

  constructor(private userService: UserService, private router: Router) { }

  canActivate(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree{
    if(!this.userService.isLoggedIn()){
      this.router.navigate(['/home']);
      return false;
    }
    return true;
  }
  
}
