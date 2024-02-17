import { Component } from '@angular/core';

@Component({
  selector: 'app-item-detail',
  template:`
  <app-page-title
  [title]="'Item Details'"
  [subTitle]="'Details for item & you can decide adding cart or not..'"
  ></app-page-title>
  <section>
    <div class="container">
      <div class="row">

        <div class="col-lg-6">
          <img src="https://thefernseed.com/cdn/shop/products/DSC_0601_1200x.jpg?v=1607209951" alt="">
        </div>
        <div class="col-lg-6 detail">
          <div class="container">
            <div class="local-delivery">
              <div class="button">local delivery & pick-up &nbsp;<i class="fa-solid fa-taxi"></i></div>
            </div>
            <div class="title-wrap">
              <h1>Standard Wrapped Floral Bouquet</h1>
              <div class="price">price at $ 69</div>
            </div>

            <button id="add-cart-btn">Add to Cart</button>

            <div class="local-delivery-sign">
              <div class="icon"><i class="fa-solid fa-taxi"></i></div>
              <p>This item is eligible for local delivery & pickup only. Orders with this item require
                doorstep delivery or in-store pickup at our Tacoma, WA storefronts.</p>
            </div>

            <div class="bar"></div>

            <div class="content">
              <p>A fresh, seasonal floral bouquet wrapped in brown kraft paper and tissue and tied with twine.
                The standard bouquet contains an handful of beautiful seasonal focal flowers balanced with seasonal foliage and filler.  </p>
              <p>
                Our florists draw from the freshest seasonally available ingredients, making each arrangement unique and one of a kind. Our color palette changes week to week and season to season. It is always different, and always beautiful.
              </p>
              <p>
                Wrapped flowers do not include a vase, and are delivered in a small box to stay upright. Stems are kept fresh in water tied with a compostable bag. We recommend adding wrapped stems to fresh water within a few hours of delivery.
              </p>

              <p>
                Add a vase to your order and our floral team will arrange your stems into a vase into delivery.
              </p>
            </div>

            <div class="bar"></div>

            <div class="acc">
              <h3>Get It With</h3>
              <div class="container">
                <div class="row">
                  <div class="col-lg-6">
                    <app-item-card
                    [delivery]="false"
                    >
                      <div class="add-cart"><button>Add to Cart</button></div>
                    </app-item-card>
                  </div>

                  <div class="col-lg-6">
                    <app-item-card
                      [delivery]="false"
                    >
                        <div class="add-cart"><button>Add to Cart</button></div>
                    </app-item-card>
                  </div>
                </div>
              </div>

            </div>




          </div>
        </div>
      </div>

    </div>
  </section>


  `,
  styleUrl: './item-detail.component.css'
})
export class ItemDetailComponent {

}
