import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HeaderComponent} from "./common/header/header.component";
import {MainComponent} from "./pages/main/main.component";

import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

import {SectionTitleComponent} from "./common/section-title/section-title.component";
import {JumbotronComponent} from "./pages/main/jumbotron/jumbotron.component";
import {MemberService} from "./_service/member.service";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {AuthGuard} from "./_auth/auth.guard";
import {AuthInterceptor} from "./_auth/auth.interceptor";
import { ProfileModule } from './pages/profile/profile.module';
import {LazyAuthGuard} from "./_auth/lazy.auth.guard";
import {AdminComponent} from "./pages/admin/admin.component";
import {SlideComponent} from "./pages/main/slide/slide.component";
import {FacebookLoginProvider, GoogleLoginProvider, SocialAuthServiceConfig} from "@abacritt/angularx-social-login";
import {PageTitleComponent} from "./common/page-title/page-title.component";
import {PostFlowerComponent} from "./pages/admin/post-flower/post-flower.component";
import {PostAccComponent} from "./pages/admin/post-acc/post-acc.component";

import {CKEditorModule} from "@ckeditor/ckeditor5-angular";
import {ListAdminPanelComponent} from "./pages/admin/list-admin-panel/list-admin-panel.component";
import {MatCell, MatCellDef, MatColumnDef, MatHeaderCell, MatHeaderCellDef} from "@angular/material/table";
import {CompleteItemListComponent} from "./pages/admin/complete-item-list/complete-item-list.component";
// import {AuthInterceptor} from "./_auth/auth.interceptor";
// import {AuthGuard} from "./_auth/auth.guard";


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
    BrowserModule,
    AppRoutingModule,
    HeaderComponent,
    BrowserAnimationsModule,
    SectionTitleComponent,
    HttpClientModule,
    ProfileModule,
    SlideComponent,
    PageTitleComponent,
    PostFlowerComponent,
    PostAccComponent,

    CKEditorModule,
    ListAdminPanelComponent,
    MatColumnDef,
    MatHeaderCell,
    MatCell,
    MatCellDef,
    MatHeaderCellDef,
    CompleteItemListComponent

  ],
  providers: [MemberService,
    AuthGuard,
    LazyAuthGuard,
    {
      multi: true,
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor
    },



    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              '822814304752-798t4us6dbodv7d0gve0g3maat7nlb6g.apps.googleusercontent.com'
            )
          },
          {
            id: FacebookLoginProvider.PROVIDER_ID,
            provider: new FacebookLoginProvider('clientId')
          }
        ],
        onError: (err) => {
          console.error(err);
        }
      } as SocialAuthServiceConfig,
    },
  ],


  exports: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
