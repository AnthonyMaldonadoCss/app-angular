import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/auth/login.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {

  userLogin: boolean = false;
  userName: string = '';

  constructor(
    private loginService: LoginService
  ) { }

  ngOnInit(): void {
    this.isLogged();
  }

  isLogged() {
    if ( this.loginService.isLogged() ) {
      console.log("estoy logueado");
      this.userLogin = true;
    }
  }
}