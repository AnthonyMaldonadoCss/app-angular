import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class RegisterParticipantsService {

  constructor(
    private http: HttpClient,
    private cookieService: CookieService
  ) { }

  register (credentials: any): Observable<any> {

    return this.http.post('http://localhost:3000/apiv1/participants/register', credentials, { 
      withCredentials: true, headers: { 'Content-Type': 'application/json', 'Authorization-token': this.cookieService.get('token')  } 
    });
  }
}
