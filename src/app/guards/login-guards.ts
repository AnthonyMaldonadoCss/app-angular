import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {
  constructor(
    private router: Router,
    private cookieService: CookieService
  ) {}

  canActivate(): boolean {
    const tokenCookieUser = this.cookieService.get('token');
    if (tokenCookieUser) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
