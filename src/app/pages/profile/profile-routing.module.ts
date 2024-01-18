import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileComponent } from './profile.component';
import {AuthGuard} from "../../_auth/auth.guard";
import {LazyAuthGuard} from "../../_auth/lazy.auth.guard";

const routes: Routes = [{ path: '', component: ProfileComponent,canActivate: [AuthGuard], data:{roles:['ROLE_USER']} }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule { }
