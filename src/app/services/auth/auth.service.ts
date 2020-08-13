import { Injectable, NgZone, OnInit, OnDestroy } from '@angular/core';
import { GoogleAuthService } from 'ng-gapi/lib/src';
import * as _ from 'lodash';
import GoogleUser = gapi.auth2.GoogleUser;
import GoogleAuth = gapi.auth2.GoogleAuth;



@Injectable()
export class AuthService  {

  public static readonly SESSION_STORAGE_KEY: string = 'accessToken';
  private user: GoogleUser = undefined;

  constructor(private googleAuthService: GoogleAuthService, private ngZone: NgZone) {
  }

  public setUser(user: GoogleUser): void {
    this.user = user;
  }

  public getCurrentUser(): GoogleUser {
    return this.user;
  }

  public getToken(): string {
    const token: string = sessionStorage.getItem(AuthService.SESSION_STORAGE_KEY);
    if (!token) {
      throw new Error('no token set');
    }
    return sessionStorage.getItem(AuthService.SESSION_STORAGE_KEY);
  }

  public signIn(): void {
    this.googleAuthService.getAuth().subscribe(
      (auth) => {
        auth.signIn().then(res =>
          this.signInSuccessHandler(res), err =>
          this.signInErrorHandler(err)
        );
      });
  }

  public signOut(): void {
    this.googleAuthService.getAuth().subscribe(
      (auth) => {
        try {
          auth.signOut();
        }
        catch (e) {
          console.error(e);
        }
        sessionStorage.removeItem(AuthService.SESSION_STORAGE_KEY);
      });
  }

  public isUserSignedIn(): boolean {
    return !_.isEmpty(sessionStorage.getItem(AuthService.SESSION_STORAGE_KEY));
  }

  private signInSuccessHandler(res: GoogleUser): void{
    this.ngZone.run(() =>
    {
      this.user = res;
      sessionStorage.setItem(
        AuthService.SESSION_STORAGE_KEY,
        res.getAuthResponse().access_token
      );
    });
  }

  private signInErrorHandler(err): void {
      console.warn(err);
    }
  }
