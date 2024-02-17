import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FlowersRoutingModule } from './flowers-routing.module';
import { FlowersComponent } from './flowers.component';
import {ItemCardComponent} from "./item-card/item-card.component";
import {PageTitleComponent} from "../../common/page-title/page-title.component";
import {ItemDetailComponent} from "./item-detail/item-detail.component";


@NgModule({
  declarations: [
    FlowersComponent,
    ItemCardComponent,
    ItemDetailComponent
  ],
  imports: [
    CommonModule,
    FlowersRoutingModule,
    PageTitleComponent,
  ]
})
export class FlowersModule { }
