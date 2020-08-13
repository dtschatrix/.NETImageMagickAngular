import { Component, OnInit} from '@angular/core';
import { GoogleApiService, GoogleAuthService } from 'ng-gapi/lib/src';
import { SheetResource } from '../demoresources';
import { AuthService } from '../../services/auth/auth.service';
import {ActivatedRoute} from '@angular/router';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  public sheetId: string;
  public sheet: any;
  public foundSheet: any;

  loginText = 'E-mail';
  passwordText = 'Password';

  constructor(private gapiService: GoogleApiService,
              private route: ActivatedRoute,
              private authService: AuthService)
  {
    gapiService.onLoad().subscribe((loaded) => console.log(loaded));
  }

  ngOnInit(): void {
    this.route.fragment.subscribe((fragment) =>
     console.log(fragment));
  }

  public isLoggedIn(): boolean {
    return this.authService.isUserSignedIn();
  }

  public signIn(): void {
    this.authService.signIn();
  }

}
