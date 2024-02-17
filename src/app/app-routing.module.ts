import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {MainComponent} from "./pages/main/main.component";
import {PageNotFoundComponent} from "./common/errorPage/page-not-found/page-not-found.component";
import {ForbiddenComponent} from "./common/errorPage/forbidden/forbidden.component";
import {AuthGuard} from "./_auth/auth.guard";
import {LazyAuthGuard} from "./_auth/lazy.auth.guard";
import {AdminComponent} from "./pages/admin/admin.component";
import {LoginPageAuthGuard} from "./_auth/login.page.auth.guard";

const routes: Routes = [{path:'', component:MainComponent},
  {path: 'admin', component: AdminComponent,canActivate: [AuthGuard], data:{roles:['ROLE_ADMIN']} },
{ path: 'login', canActivate:[LoginPageAuthGuard], loadChildren: () => import('./pages/login/login.module').then(m => m.LoginModule) },
{ path: 'signup', canActivate:[LoginPageAuthGuard], loadChildren: () => import('./pages/signup/signup.module').then(m => m.SignupModule) },
  {path: 'forbidden', component: ForbiddenComponent},
{ path: 'profile', loadChildren: () => import('./pages/profile/profile.module').then(m => m.ProfileModule),
  canLoad: [LazyAuthGuard], data:{roles:['ROLE_USER']}},
  { path: 'flowers', loadChildren: () => import('./pages/flowers/flowers.module').then(m => m.FlowersModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
