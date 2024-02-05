import { Component } from '@angular/core';
import { LoginRequest, LoginResponse } from '../../../models/user';
import { BaseService } from '../../../services/base.service';
import { UserRole } from '../../../enums/enum';
import { Router } from '@angular/router';
import { SharedService } from '../../../services/shared.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  constructor(
    private service: BaseService,
    private router: Router,
    private sharedService: SharedService
  ) {}
  loginRequest: LoginRequest = new LoginRequest();

  ngOnInit(): void {
    const userCredentials = this.sharedService.getLocalObject();
    if (userCredentials) this.navigator(userCredentials.userRole);
  }

  login(): void {
    this.service
      .Post<LoginRequest, LoginResponse>(this.loginRequest, 'auth/login')
      .subscribe({
        next: (response) => {
          console.log(response);
          if (response.isSuccess) {
            sessionStorage.setItem(
              'panda-shop',
              JSON.stringify(response.result)
            );
            this.navigator(response.result.userRole);
          }
        },
        error: (err: Error) => {},
      });
  }


  
  navigator(userRole: UserRole): void {
    switch (userRole) {
      case UserRole.Admin:
        this.router.navigate(['/admin']);
        break;
      case UserRole.Customer:
        this.router.navigate(['/customer']);
        break;
      case UserRole.ProductManager:
        this.router.navigate(['/manager']);
        break;
    }
  }
}
