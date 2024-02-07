import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FlowersRoutingModule } from './flowers-routing.module';
import { FlowersComponent } from './flowers.component';
import {ItemCardComponent} from "./item-card/item-card.component";
import {PageTitleComponent} from "../../common/page-title/page-title.component";


@NgModule({
  declarations: [
    FlowersComponent,
    ItemCardComponent
  ],
  imports: [
    CommonModule,
    FlowersRoutingModule,
    PageTitleComponent,
  ]
})
export class FlowersModule { }
