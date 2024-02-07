import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from './profile.component';
import {AuthGuard} from "../../_auth/auth.guard";
import {LazyAuthGuard} from "../../_auth/lazy.auth.guard";
import {PageTitleComponent} from "../../common/page-title/page-title.component";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {FormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    ProfileComponent
  ],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    PageTitleComponent,
    FormsModule,
  ],
  providers:[
    AuthGuard,
    LazyAuthGuard,
  ]
})
export class ProfileModule { }
