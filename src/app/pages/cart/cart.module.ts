import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CartRoutingModule } from './cart-routing.module';
import { CartComponent } from './cart.component';
import {PageTitleComponent} from "../../common/page-title/page-title.component";
import {CartItemsComponent} from "./cart-items/cart-items.component";


@NgModule({
  declarations: [
    CartComponent
  ],
  imports: [
    CommonModule,
    CartRoutingModule,
    PageTitleComponent,
    CartItemsComponent
  ]
})
export class CartModule { }
