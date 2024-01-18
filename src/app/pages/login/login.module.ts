import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';
import {FooterComponent} from "../../common/footer/footer.component";
import {ValidationComponent} from "./validation/validation.component";
import {TimerComponent} from "../../common/timer/timer.component";
import {ReactiveFormsModule} from "@angular/forms";
import {LoadingComponent} from "../../common/loading/loading.component";
import {MemberService} from "../../service/member.service";



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
  ],
  providers:[
    MemberService,
  ]
})
export class LoginModule { }
