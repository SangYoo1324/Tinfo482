import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CartRoutingModule } from './cart-routing.module';
import { CartComponent } from './cart.component';
import {PageTitleComponent} from "../../common/page-title/page-title.component";
import {CartItemsComponent} from "./cart-items/cart-items.component";
import {DeliverySelectComponent} from "./delivery-select/delivery-select.component";
import {FooterComponent} from "../../common/footer/footer.component";


@NgModule({
  declarations: [
    CartComponent
  ],
  imports: [
    CommonModule,
    CartRoutingModule,
    PageTitleComponent,
    CartItemsComponent,
    DeliverySelectComponent,
    FooterComponent
  ]
})
export class CartModule { }
