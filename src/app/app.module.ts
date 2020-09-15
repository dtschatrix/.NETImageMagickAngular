import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { ConfigService } from 'src/app/shared/config.service';

import { SharedModule } from 'src/app/shared/shared.module';
import { CoreModule } from 'src/app/core/core.module';
import { HomeModule } from 'src/app/home/home.module';
import { ShellModule } from 'src/app/shell/shell.module';
import { AuthCallbackComponent } from './components/auth-callback/auth-callback.component';
import { AccountModule } from 'src/app/components/account/account.module';
import { AuthService } from './core/authentication/auth.service';
import { AppRoutingModule } from './app-routing.module';
import { ApiModule } from './components/api/api.module';

@NgModule({
  declarations: [
    AppComponent,
    AuthCallbackComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    CoreModule,
    HomeModule,
    AccountModule,
    ApiModule,
    AppRoutingModule,
    ShellModule,
    SharedModule,
  ],
  providers: [
    ConfigService,
    AuthService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
