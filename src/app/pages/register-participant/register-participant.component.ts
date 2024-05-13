import { Component, OnInit } from '@angular/core';

import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { LoginService } from '../../services/auth/login.service';
import { LoginRequest } from '../../services/auth/loginRequest';
import { CookieService } from 'ngx-cookie-service';

import { RegisterParticipantsService } from '../../services/register-participants/register-participants.service';

@Component({
  selector: 'app-register-participant',
  templateUrl: './register-participant.component.html',
  styleUrl: './register-participant.component.css'
})
export class RegisterParticipantComponent implements OnInit {

  messageError = '';
  messageSuccess = '';

  subscriptionForm = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(25)]],
    lastName: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(25)]],
    phone: ['', [
      Validators.required,
      Validators.pattern('^[0-9]*$'),
      Validators.minLength(7)
    ]],
  })

  constructor(
    private fb: FormBuilder,
    private registerParticipantsService: RegisterParticipantsService,
    private cookieService: CookieService,
    private router: Router
  ) { }

  ngOnInit(): void {
  
  }

  get name() {
    return this.subscriptionForm.controls['name'];
  }

  get LastName() {
    return this.subscriptionForm.controls['lastName'];
  }

  get phone() {
    return this.subscriptionForm.controls['phone'];
  }

  login() {
    if (this.subscriptionForm.valid) {
      this.registerParticipantsService.register(this.subscriptionForm.value as LoginRequest).subscribe({
        next: ( response: any) => {
          if (response.message == 'Participant saved') {
            this.messageSuccess = '¡Gracias por participar!';
            
            setTimeout(() => {
              this.router.navigate(['/dashboard']);
            },3000);

            this.clearMessage();
          }
        },
        error: (error: any) => {
          this.messageError = error.error.message;
          this.clearMessage();
        },
        complete: () => {
          this.subscriptionForm.reset();
        }
      })
    }
    else {
      this.subscriptionForm.markAllAsTouched();
      console.log(this.subscriptionForm.value);
    }
  }
  
  clearMessage() {
    if (this.messageError || this.messageSuccess) {
      setTimeout(() => {
        this.messageError = '';
        this.messageSuccess = '';
      }, 9000);
    }
  }

}
