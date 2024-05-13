import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { LoginService } from '../../services/auth/login.service';
import { LoginRequest } from '../../services/auth/loginRequest';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-subscription-form',
  templateUrl: './subscription-form.component.html',
  styleUrl: './subscription-form.component.css'
})
export class SubscriptionFormComponent implements OnInit {

  userLogin: boolean = false;
  messageError = '';
  messageSuccess = '';

  registerForm = this.fb.group({
    email: ['', [Validators.required, 
      Validators.email, 
      Validators.minLength(5),
      Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')
    ]],
    password: ['', [Validators.required]]
  })

  constructor(
    private fb: FormBuilder,
    private loginService: LoginService,
    private cookieService: CookieService,
    private router: Router
  ) { }

  ngOnInit(): void {
  
  }

  get email() {
    return this.registerForm.controls['email'];
  }

  get password() {
    return this.registerForm.controls['password'];
  }

  login() {
    if (this.registerForm.valid) {
      this.loginService.register(this.registerForm.value as LoginRequest).subscribe({
        next: ( response: any) => {
          if (response.token) {
            this.cookieService.set('token', response.token, {expires: 1, secure: true, sameSite: 'Strict' });
            localStorage.setItem('token', response.token);
            this.userLogin = true;
            this.messageSuccess = '¡Gracias por registrarte!';

            setTimeout(() => {
              this.router.navigate(['/dashboard']);
            }, 3000);

          }
          else {
            console.log(response);
          }
        },
        error: (error: any) => {
          console.log(error)
          this.messageError = error.error.message;
          this.clearMessage();
        },
        complete: () => {
          this.registerForm.reset();
        }
      })
    }
    else {
      this.registerForm.markAllAsTouched();
      console.log(this.registerForm.value);
    }
  }

  clearMessage() {
    if (this.messageError) {
      setTimeout(() => {
        this.messageError = '';
      }, 5000);
    }
  }
}
