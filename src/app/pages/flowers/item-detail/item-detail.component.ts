import {Component, Input, SecurityContext} from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {ActivatedRoute} from "@angular/router";
import {ItemService} from "../../../_service/item.service";
import {DomSanitizer, SafeHtml} from "@angular/platform-browser";

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
          <img [src]=" (completeItem | async)?.flowerDto.img_url" alt="">
        </div>
        <div class="col-lg-6 detail">
          <div class="container">
            <div class="local-delivery">
              <div class="button">local delivery & pick-up &nbsp;<i class="fa-solid fa-taxi"></i></div>
            </div>
            <div class="title-wrap">
              <h1>{{(completeItem | async)?.flowerDto.name}}</h1>
              <div class="price">price at {{(completeItem | async)?.flowerDto.price | currency : 'USD' : 'symbol':'1.2-2'}}</div>
            </div>

            <button id="add-cart-btn"  (click)="addCart(completeItemId)">Add to Cart</button>

            <div class="local-delivery-sign" *ngIf="(completeItem | async)?.flowerDto.delivery">
              <div class="icon"><i class="fa-solid fa-taxi"></i></div>
              <p>This item is eligible for local delivery & pickup only. Orders with this item require
                doorstep delivery or in-store pickup at our Tacoma, WA storefronts.</p>
            </div>

            <div class="bar"></div>

            <div class="content" [innerHTML]="safeContentHtml" >
            </div>

            <div class="bar"></div>

            <div class="acc">
              <h3>Get It With</h3>
              <div class="container">
                <div class="row">
                  <ng-container  *ngIf="(completeItem | async)?.accDto[0]">
                  <div class="col-lg-6"  *ngFor="let acc of (completeItem | async)?.accDto">


                      <app-item-card
                                      [delivery]="false"
                                      [item]="acc"
                                      [isAcc] = true
                      >
                        <div class="add-cart"><button (click)="addCart(acc.id)">Add to Cart</button></div>
                      </app-item-card>



                  </div>
                  </ng-container>
                  <div class="col-lg-6">
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

  completeItemId!: number;

  completeItem!: Observable<any>;

  completeItemObj!: any;

  safeContentHtml!: SafeHtml;

  constructor(private route:ActivatedRoute, private itemService:ItemService, private sanitizer:DomSanitizer) {
  }

  ngOnInit(){
    const id = this.route.snapshot.paramMap.get('id');
    if(id !==null){
      // @ts-ignore
      this.completeItemId = id as number;
      console.log("completItemId::: "+this.completeItemId);
    }

    this.completeItem = this.itemService.fetchTargetCompleteItem(this.completeItemId);
    this.completeItem.subscribe((resp)=>{
      console.log(resp);
      this.safeContentHtml = this.sanitizer.bypassSecurityTrustHtml(resp.flowerDto.content)!;

    }, error => {
      console.log(error);
    });
  }


  addCart(id:number){
    console.log(id);
  }

}
