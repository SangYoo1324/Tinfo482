import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SignupRoutingModule } from './signup-routing.module';
import { SignupComponent } from './signup.component';
import {FooterComponent} from "../../common/footer/footer.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MemberService} from "../../_service/member.service";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {LoginPageAuthGuard} from "../../_auth/login.page.auth.guard";



@NgModule({
  declarations: [
    SignupComponent
  ],
  imports: [
    CommonModule,
    SignupRoutingModule,
    FooterComponent,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule
  ],
  providers:[
  LoginPageAuthGuard
  ]
})
export class SignupModule { }
