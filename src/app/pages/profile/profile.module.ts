import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from './profile.component';
import {AuthGuard} from "../../_auth/auth.guard";
import {LazyAuthGuard} from "../../_auth/lazy.auth.guard";


@NgModule({
  declarations: [
    ProfileComponent
  ],
  imports: [
    CommonModule,
    ProfileRoutingModule
  ],
  providers:[
    AuthGuard,
    LazyAuthGuard
  ]
})
export class ProfileModule { }
