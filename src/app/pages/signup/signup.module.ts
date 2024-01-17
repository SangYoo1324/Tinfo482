import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SignupRoutingModule } from './signup-routing.module';
import { SignupComponent } from './signup.component';
import {FooterComponent} from "../../common/footer/footer.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MemberService} from "../../service/member.service";
import {HttpClientModule} from "@angular/common/http";


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
    MemberService
  ]
})
export class SignupModule { }
