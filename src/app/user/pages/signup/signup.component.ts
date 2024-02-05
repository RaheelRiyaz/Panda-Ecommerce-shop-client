import { Component } from '@angular/core';
import { UserSignupRequest, UserSignupRespone } from '../../../models/user';
import { BaseService } from '../../../services/base.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss',
})
export class SignupComponent {
  constructor(private service: BaseService, private router: Router) {}
  userSignupRequest: UserSignupRequest = new UserSignupRequest();

  signup(): void {
    this.service
      .Post<UserSignupRequest, UserSignupRespone>(
        this.userSignupRequest,
        'auth/user-signup'
      )
      .subscribe({
        next: (response) => {
          if(response.isSuccess) this.router.navigate([''])
        },
        error: (err: Error) => {
          console.log(err);
        },
      });
  }
}
