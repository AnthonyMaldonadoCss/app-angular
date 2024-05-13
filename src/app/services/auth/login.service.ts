import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LoginRequest } from './loginRequest';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(
    private http: HttpClient,
    private cookieService: CookieService
  ) { }

  login(credentials: LoginRequest): Observable<any> {
    console.log(credentials);
    return this.http.post('http://localhost:3000/apiv1/users/signin', credentials);
  }

  register(credentials: LoginRequest): Observable<any> {
    return this.http.post('http://localhost:3000/apiv1/users/register', credentials);
  }

  logout() {
    this.cookieService.deleteAll('token');
    localStorage.removeItem('token');
  }

  isLogged() {
    const token =  this.cookieService.get('token');

    if ( !token ) {
      return undefined;
    }
    return token;
  }

  verifyToken() {
    let headers = new HttpHeaders();
    
    headers.append('Content-Type', 'application/json');
    
    return this.http.get('http://localhost:3000/apiv1/users/verify', {
      withCredentials: true, headers: headers
    });
  }
}
