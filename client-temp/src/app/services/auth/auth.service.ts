// author Tigist Damesa ....05/02/2018
// https://manage.auth0.com/#/clients/cDJlPPaVj23AkRKFJJ8P3MYjG9ZVjKz4/quickstart

import { Injectable } from '@angular/core';
import { AUTH_CONFIG } from './auth0-variables';
import { Router } from '@angular/router';
import * as auth0 from 'auth0-js';
import { UserService } from '../user.service';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { mergeMap } from 'rxjs/operators';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/timer';



declare const io;

@Injectable()
export class AuthService {
  auth0 = new auth0.WebAuth({
    clientID: AUTH_CONFIG.clientID,
    domain: AUTH_CONFIG.domain,
    responseType: 'token id_token',
    audience: `https://${AUTH_CONFIG.domain}/userinfo`,
    redirectUri: AUTH_CONFIG.callbackURL,
    scope: 'openid email profile'
  });

  constructor(public router: Router, public userService: UserService) {}

  authChanged = new Subject<boolean>();
  name;
  email;
  socket;
    // define the refreshSubscription property
    refreshSubscription: any;
  public login(): void {
    this.auth0.authorize();
  }

  connectSocket(token) {
    this.socket = io('http://localhost:3000', {
      transportOptions: {
        polling: {
          extraHeaders: {
            Authorization: `Bearer ${token}`
          }
        }
      }
    });
  }

  public handleAuthentication(): void {
    if (this.isAuthenticated()) {
      this.connectSocket(this.getToken());
      this.authChanged.next(true);
      this.name = localStorage.getItem('name');
    }
    this.auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        this.authChanged.next(true);
        this.setSession(authResult);
        this.connectSocket(authResult.accessToken);
        this.email = authResult.idTokenPayload.email;
        this.name = authResult.idTokenPayload.name;

        this.userService
          .getUser(authResult.idTokenPayload.email)
          .subscribe(user => {
            if (user) {
              this.router.navigate(['/users']);
            } else {
              this.router.navigate(['/profile', this.email, this.name]);
            }
          });
      } else if (err) {
        this.router.navigate(['/']);
        console.log(err);
        alert(`Error: ${err.error}. Check the console for further details.`);
      }
    });
  }

  private setSession(authResult): void {
    // Set the time that the access token will expire at
    const expiresAt = JSON.stringify(
      authResult.expiresIn * 1000 + new Date().getTime()
    );
    localStorage.setItem('access_token', authResult.accessToken);
    localStorage.setItem('id_token', authResult.idToken);
    localStorage.setItem('name', authResult.idTokenPayload.name);
    localStorage.setItem('email', authResult.idTokenPayload.email);
    localStorage.setItem('expires_at', expiresAt);
    this.scheduleRenewal();
  }

  logout(): void {
    // Remove tokens and expiry time from localStorage
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
    localStorage.removeItem('name');
    localStorage.removeItem('email');
    this.unscheduleRenewal();
    // Go back to the home route
    this.router.navigate(['/']);
    this.authChanged.next(false);
  }

  getName() {
    return localStorage.getItem('name');
  }

  getEmail() {
    return localStorage.getItem('email');
  }

  getToken() {
    return localStorage.getItem('id_token');
  }

  isAuthenticated(): boolean {
    // Check whether the current time is past the
    // access token's expiry time
    const expiresAt = JSON.parse(localStorage.getItem('expires_at'));
    return new Date().getTime() < expiresAt;
  }
  public renewToken() {
    this.auth0.checkSession({}, (err, result) => {
      if (err) {
        console.log(err);
      } else {
        this.setSession(result);
      }
    });
  }


  // ...
  public scheduleRenewal() {
    if (!this.isAuthenticated()) { return; }
    this.unscheduleRenewal();

    const expiresAt = JSON.parse(window.localStorage.getItem('expires_at'));

    const expiresIn$ = Observable.of(expiresAt).pipe(
      mergeMap(
        expires => {
          const now = Date.now();
          // Use timer to track delay until expiration
          // to run the refresh at the proper time
          return Observable.timer(Math.max(1, expires - now));
        }
      )
    );

    // Once the delay time from above is
    // reached, get a new JWT and schedule
    // additional refreshes
    this.refreshSubscription = expiresIn$.subscribe(
      () => {
        this.renewToken();
        this.scheduleRenewal();
      }
    );
  }

  public unscheduleRenewal() {
    if (this.refreshSubscription) {
      this.refreshSubscription.unsubscribe();
    }
  }
}


