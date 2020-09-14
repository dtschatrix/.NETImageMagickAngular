import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserManager, UserManagerSettings, User, WebStorageStateStore } from 'oidc-client';
import { BehaviorSubject, Observable } from 'rxjs';
import { ConfigService } from 'src/app/shared/config.service';

@Injectable()
export class AuthService {
  private authNavStatusSource = new BehaviorSubject<boolean>(false);

  authNavStatus$ = this.authNavStatusSource.asObservable();

  private manager = new UserManager(getClientSettings());
  private user: User;

  constructor(private http: HttpClient, private configService: ConfigService) {
    this.manager.getUser().then(user => {
      if (user){
      this.user = user;
      this.authNavStatusSource.next(this.isAuthenticated());
      }
    })
    .catch((err) => {
      console.log(this.user);
    });
  }

  login(): Promise<void> {
    return this.manager.signinRedirect();
  }

  async completeAuthentication(): Promise<void> {
    await this.manager.signinRedirectCallback().then((user) => {
      this.user = user;
    });
    this.authNavStatusSource.next(this.isAuthenticated());
  }

  register(userRegistration: any): Observable<any> {
    return this.http.post(this.configService.authApiURI + '/account', userRegistration);
  }

  isAuthenticated(): boolean {
    return this.user != null && !this.user.expired;
  }

  get AuthorizationHeaderValue(): string {
    return `${this.user.token_type} ${this.user.access_token}`;
  }

  get name(): string {
    return this.user != null ? this.user.profile.name : '';
  }

  async signout(): Promise<void> {
    await this.manager.signoutRedirect();
  }
}

export function getClientSettings(): UserManagerSettings {
  return {
    authority: 'https://localhost:5001',
    client_id: 'accordUser',
    redirect_uri: 'http://localhost:4200/auth-callback',
    post_logout_redirect_uri: 'http://localhost:4200/',
    response_type: 'id_token token',
    scope: 'openid profile email image',
    filterProtocolClaims: true,
    loadUserInfo: true,
    automaticSilentRenew: true,
    userStore: new WebStorageStateStore({store: window.localStorage}),
  };
}
