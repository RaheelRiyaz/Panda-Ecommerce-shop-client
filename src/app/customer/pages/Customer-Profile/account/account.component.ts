import { Component } from '@angular/core';
import { BaseService } from '../../../../services/base.service';
import { ChangePasswordRequest } from '../../../../models/user';
import { environment } from '../../../../environment/environment';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrl: './account.component.scss',
})
export class AccountComponent {
  constructor(private service: BaseService) {}
  changePasswordRequest: ChangePasswordRequest = new ChangePasswordRequest();

  saveChanges(): void {
    this.service
      .Update<ChangePasswordRequest, string>(
        this.changePasswordRequest,
        'auth/change-password'
      )
      .subscribe({
        next: (response) => {
          if (response.isSuccess) environment.fireSwal(response.result);
          else environment.fireSwal(response.message, 'error');
          this.changePasswordRequest = new ChangePasswordRequest();
        },
        error: (err: Error) => {
          environment.fireSwal(err.message, 'error');
        },
      });
  }
}
