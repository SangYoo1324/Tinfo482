import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';
import {FooterComponent} from "../../common/footer/footer.component";
import {ValidationComponent} from "./validation/validation.component";
import {TimerComponent} from "../../common/timer/timer.component";
import {ReactiveFormsModule} from "@angular/forms";
import {LoadingComponent} from "../../common/loading/loading.component";
import {MemberService} from "../../_service/member.service";
import {
  FacebookLoginProvider,
  GoogleLoginProvider,
  GoogleSigninButtonModule,
  SocialAuthServiceConfig
} from "@abacritt/angularx-social-login";
import {env_var} from "../../_env/env.now";
import {LoginPageAuthGuard} from "../../_auth/login.page.auth.guard";



@NgModule({
  declarations: [
    LoginComponent,
    ValidationComponent
  ],
  imports: [
    CommonModule,
    LoginRoutingModule,
    FooterComponent,
    TimerComponent,
    ReactiveFormsModule,
    LoadingComponent,
    GoogleSigninButtonModule,
  ],
  providers:[
    MemberService,
    LoginPageAuthGuard,
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              env_var.google_api_id
            )
          },
          {
            id: FacebookLoginProvider.PROVIDER_ID,
            provider: new FacebookLoginProvider(env_var.facebook_api_id)
          }
        ],
        onError: (err) => {
          console.error(err);
        }
      } as SocialAuthServiceConfig,
    },

  ]
})
export class LoginModule { }
