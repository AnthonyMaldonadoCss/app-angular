import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../../services/auth/login.service';
import { LoginRequest } from '../../services/auth/loginRequest';
import { CookieService } from 'ngx-cookie-service'; 

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})

export class LoginComponent implements OnInit {

  message = '';

  loginForm = this.fb.group({
    email: ['', [Validators.required, 
      Validators.email, 
      Validators.minLength(5),
      Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')
    ]],
    password: ['', [Validators.required]]
  })

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private loginService: LoginService,
    private cookieService: CookieService
  ) { }

  ngOnInit(): void {
  
  }

  get email() {
    return this.loginForm.controls['email'];
  }

  get password() {
    return this.loginForm.controls['password'];
  }

  login() {
    if (this.loginForm.valid) {
      this.loginService.login(this.loginForm.value as LoginRequest).subscribe({
        next: ( response: any) => {
          if (response.auth) {
            this.cookieService.set('token', response.token, {expires: 1, secure: true, sameSite: 'Strict' });
            localStorage.setItem('token', response.token);
            this.router.navigate(['/dashboard']);
          }
          else {
            console.log(response);
          }
        },
        error: (error: any) => {
          console.log(error)
          this.message = error.error.message;
          this.clearMessage();
        },
        complete: () => {
          this.loginForm.reset();
        }
      })
    }
    else {
      this.loginForm.markAllAsTouched();
      console.log(this.loginForm.value);
    }
  }

  clearMessage() {
    if (this.message) {
      setTimeout(() => {
        this.message = '';
      }, 5000);
    }
  }
}
