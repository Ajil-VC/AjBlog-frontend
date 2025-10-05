import { Component } from '@angular/core';
import { AuthService } from '../../../../shared/Auth service/auth.service';
import { User } from '../../../../core/domain/user.interface';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-profile',
  imports: [AsyncPipe],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {

  public user: User | null = null;
  constructor(public authSer: AuthService) { }

  logOut() {

    if (confirm('Are you sure you want to logout?')) {

      this.authSer.logoutUser();
    }
  }
}
