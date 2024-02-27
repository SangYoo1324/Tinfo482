import { Component } from '@angular/core';
import {MemberAuthService} from "../../_auth/member-auth.service";

@Component({
  selector: 'app-cart',
  template:`

    <app-page-title
    [subTitle]="'Review your orders and make final decision for check out!'"
    [title]="'Shopping Cart'"
    ></app-page-title>

    <section>
      <div class="container">

        <div class="title"><h1>Shopping Cart for <b>"{{username}}"</b></h1></div>
        <div class="line"></div>

        <app-cart-items  *ngIf="cart.length>0"></app-cart-items>

        <div class="no-items" *ngIf="cart.length<=0">
          <h1> Your Cart is currently Empty</h1>
          <p routerLink="/flowers"> <i class="fa-solid fa-arrow-left-long"></i> Continue Shopping!</p>
        </div>
      </div>
    </section>

    <div class="container line"></div>


        <app-delivery-select></app-delivery-select>

    <app-footer></app-footer>

    <style>
      .title>h1{
        color: #375B50;
        margin: 4rem auto;
        width: 70%;
        text-align: center;
      }
      h1>b{
        color: darkorange;
      }

      .line{
        width: 100%;
        height: 2px;
        background-color: lightgray;
      }

      .no-items{
        margin-top: 5rem;
      }

      .no-items>h1{
        color: #375B50;
        text-align: center;
      }
      .no-items>p{
        font-size: 1.3rem;
        margin-top: 1rem;
        text-align: center;
      }
      .no-items>p:hover{
        color: #3498db;
        cursor: pointer;
        text-decoration: underline;
      }
      p>i{
        transition: transform 0.5s ease-in-out;
      }
      .no-items>p:hover>i{
        transform: translateX(-50%);
      }



    </style>

  `,
  styleUrl: './cart.component.css'
})
export class CartComponent {

  cart:any=[{} ];

  constructor(private memberAuthService:MemberAuthService) {
  }

  username = ''

  ngOnInit(){
    this.username = this.memberAuthService.getusernameEmail().username;
  }
}
