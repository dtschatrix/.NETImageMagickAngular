import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { RouterModule } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import { MatSliderModule,  } from '@angular/material/slider';
import { MatInputModule } from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {MatNativeDateModule} from '@angular/material/core';
import { FormsModule } from '@angular/forms';
import {MAT_FORM_FIELD_DEFAULT_OPTIONS} from '@angular/material/form-field';
import {GoogleApiModule, NG_GAPI_CONFIG, NgGapiClientConfig} from 'ng-gapi/lib/src';
import {AuthService} from 'src/app/services/auth/auth.service';

const gapiClientConfig: NgGapiClientConfig = {
  client_id: '995103581086-ncpi8bivf8sep1bobmsipvjfcd9tbigm.apps.googleusercontent.com',
  ux_mode: 'redirect',
  discoveryDocs: ['https://analyticsreporting.googleapis.com/$discovery/rest?version=v4'],
  redirect_uri: 'http://localhost:4200',
  scope: ['https://www.googleapis.com/auth/userinfo.profile'].join(' '),
};

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent
  ],
  imports: [
    FormsModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatSliderModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot([]),
    GoogleApiModule.forRoot({
      provide: NG_GAPI_CONFIG,
      useValue: gapiClientConfig
    }),
  ],
  providers: [
    {
    provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
    useValue:
      {
       appearance: 'outline',
       floatLabel: 'always'
      }
    },
  AuthService],
  bootstrap: [LoginComponent]
})
export class AppModule { }
