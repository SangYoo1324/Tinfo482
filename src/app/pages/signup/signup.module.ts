import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SignupRoutingModule } from './signup-routing.module';
import { SignupComponent } from './signup.component';
import {FooterComponent} from "../../common/footer/footer.component";


@NgModule({
  declarations: [
    SignupComponent
  ],
    imports: [
        CommonModule,
        SignupRoutingModule,
        FooterComponent
    ]
})
export class SignupModule { }
