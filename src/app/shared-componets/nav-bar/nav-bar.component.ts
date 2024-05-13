import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/auth/login.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent implements OnInit {
  userLogin: boolean = false;
  
  constructor(
    private loginService: LoginService
  ) { }

  ngOnInit(): void {
    this.isLogged();
  }

  isLogged() {

    if ( this.loginService.isLogged() ) {
      this.userLogin = true;
    }
    // this.loginService.isLogged().subscribe({
    //   next: (response: any) => {
    //     console.log(response);
  
    //     if (response.auth) {
    //       this.userLogin = true;
    //     }
    //   },
    //   error: (error: any) => {
    //     console.log(error);
    //   }
    // });
  }

  logOut() {
    this.loginService.logout();
  }
}
