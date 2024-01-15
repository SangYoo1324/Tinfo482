import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HeaderComponent} from "./common/header/header.component";
import {MainComponent} from "./pages/main/main.component";

import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

import {SectionTitleComponent} from "./common/section-title/section-title.component";
import {JumbotronComponent} from "./pages/main/jumbotron/jumbotron.component";


@NgModule({
  declarations: [
    AppComponent,

    // main page components
    MainComponent,
    JumbotronComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HeaderComponent,
    BrowserAnimationsModule,
    SectionTitleComponent,
  ],
  providers: [],
  exports: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
