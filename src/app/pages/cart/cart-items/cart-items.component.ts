import {Component, signal} from '@angular/core';
import {NgForOf, NgIf} from "@angular/common";


@Component({
  selector: 'app-cart-items',
  standalone: true,
  imports: [
    NgIf,
    NgForOf
  ],
  template:`
        <div class="container">

          <div class="wrap">

            <div class="item" *ngFor="let item of object; let i=index">
              <div class="row pt-2">
                <div class="col-lg-3">
                <img src="https://sammyoopublicbucket.s3.us-west-2.amazonaws.com/5691b4dd-2125-48cd-9aee-ec50eb39e9a1.jpg" alt="">
                </div>
                <div class="col-lg-8">
                    <div class="name">{{item.itemName}}</div>
                  <div class="local-delivery">
                    <div class="button">local delivery & pick-up &nbsp;<i class="fa-solid fa-taxi"></i></div>
                  </div>
                  <div class="price"> $ 39.00</div>
                  <div class="quantity">
                    <div class="plus" (click)="incrementQuantity(i)"><span>+</span></div>
                    <div class="value">{{item.quantity}}</div>
                    <div class="minus" (click)="decrementQuantity(i)"><span>-</span></div>
                  </div>
                </div>
                <div class="col-lg-1">
                  <p class="remove">remove</p>
                </div>
              </div>
            </div>


          </div>


          <div class="price-wrap row">
            <div class="col-lg-7">
              <small>Special Request? Need to add info? Leave us a note with your order!</small>
              <textarea name="" id="" cols="50" rows="4"></textarea>

            </div>
            <div class="col-lg-5">

              <div class="totalPrice">
                <div class="price">
                  <label>SubTotal</label>
                  <div>$ 39.00</div>
                </div>

                <label >Tax</label>
                <div>$ 3.90</div>
              </div>

            </div>
          </div>
        </div>

  `,
  styles: [`
  .item{
    border-bottom: 2px solid lightgrey;
  }
  img{
    display: block;
    width: 95%;
    height: 200px;
    border-radius: 1rem;
    margin: 1.5rem auto;
  }

  .remove{
    margin-top: 1rem;
    text-decoration: underline;
    cursor: pointer;
    color: grey;
  }
  .remove:hover{
    color: #375B50;
  }

  .local-delivery{
    padding-top: 0.5rem;
    margin-right: 0.2rem;
  }
  .button{
    width: 50%;

    padding: 0.2rem 0.3rem;
    text-align: center;
    background: #375B50;
    color: white;
    border-radius: 1rem;

  }
  .quantity{
    display: flex;
    margin-top: 3rem;
  }
  .name{
    font-size: 1.3rem;
    color: #375B50;
    font-weight: bold;
  }

  .price{
    margin-top: 1rem;
  }

  .plus, .minus{
    background: #375B50;
    color: white;
    width: 25px;
    height: 25px;
  }
  .plus:hover, .minus:hover{
    cursor:pointer;
  }
  .value{
    padding: 0 1rem;
  }
  span{
    display:block;
    width:100%;
    text-align: center;
    font-weight: bold;
  }
  small{
    display: block;
  }



  textarea{

  }

  `]
})
export class CartItemsComponent {

  object:any[] = [
    {itemName: 'flowerEx_1',
      quantity: 1
    },
    {
      itemName : 'flowerEx_2',
      quantity:1
    }
  ];





  incrementQuantity(i:number){
    let q =  this.object[i].quantity;
    if(q<6){
      this.object[i].quantity++;
    }

  }
  decrementQuantity( i: number){
    let q =  this.object[i].quantity;
    if(q>1){
      this.object[i].quantity--;
    }

  }


}
