import { Component } from '@angular/core';
import { AuthService } from './services/auth/auth.service';
import { UserService } from './services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(public auth: AuthService, private router: Router) {
    auth.handleAuthentication();
    auth.scheduleRenewal();
  }
  searchTerm;
  filter() {
    this.router.navigate(['users', this.searchTerm]);
  }
  signIn() {
    this.auth.login();
  }
  signOut() {
    this.auth.logout();
  }
}
