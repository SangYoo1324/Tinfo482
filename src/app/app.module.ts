import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HeaderComponent} from "./common/header/header.component";
import {MainComponent} from "./pages/main/main.component";

import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

import {SectionTitleComponent} from "./common/section-title/section-title.component";
import {JumbotronComponent} from "./pages/main/jumbotron/jumbotron.component";
import {MemberService} from "./service/member.service";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {AuthGuard} from "./_auth/auth.guard";
import {AuthInterceptor} from "./_auth/auth.interceptor";
import { ProfileModule } from './pages/profile/profile.module';
import {LazyAuthGuard} from "./_auth/lazy.auth.guard";
import {AdminComponent} from "./pages/main/admin/admin.component";
// import {AuthInterceptor} from "./_auth/auth.interceptor";
// import {AuthGuard} from "./_auth/auth.guard";
import { SocialLoginModule, SocialAuthServiceConfig } from '@abacritt/angularx-social-login';
import {
  GoogleLoginProvider,
  FacebookLoginProvider
} from '@abacritt/angularx-social-login';
import {environmentVariables} from "./_env/env.variables";
import {LoginAuthGuard} from "./_auth/login.auth.guard";

@NgModule({
  declarations: [
    AppComponent,

    // main page components
    MainComponent,
    JumbotronComponent,

    //admin
    AdminComponent
  ],
  imports: [

    //animation Related
    BrowserAnimationsModule,
    BrowserModule,


    AppRoutingModule,
    HeaderComponent,
    SectionTitleComponent,
    HttpClientModule,
    ProfileModule,

    // social login related
    SocialLoginModule,

  ],
  providers: [
    MemberService,
    AuthGuard,
    LazyAuthGuard,
    LoginAuthGuard,
    {
      multi: true,
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor
    },

    // social login related
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              environmentVariables.googleClientId
            )
          },
          {
            id: FacebookLoginProvider.PROVIDER_ID,
            provider: new FacebookLoginProvider(environmentVariables.facebookAppId)
          }
        ],
        onError: (err) => {
          console.error(err);
        }
      } as SocialAuthServiceConfig,
    }
  ],
  exports: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
