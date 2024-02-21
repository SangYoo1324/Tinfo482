import {Component, Input} from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";

@Component({
  selector: 'app-item-card',
  template:`


    <div class="card-wrap" >
      <!--    isAcc = false-->
      <div class="wrap" *ngIf="!isAcc">
        <div class="top"  [ngStyle]="{'background-image': 'url('+item.flowerDto.img_url+')'}">
          <div class="local-delivery" *ngIf="delivery">
            <div class="button">local delivery & pick-up &nbsp;<i class="fa-solid fa-taxi"></i></div>
          </div>
          <div class="cover-overlay"></div>
        </div>
        <div class="bottom">
          <div class="title">{{item.flowerDto.name}}</div>
          <div class="price"><span><b>From</b></span> &nbsp; <span>{{item.flowerDto.price | currency:'USD': 'symbol':'1.2-2'}}</span></div>
        </div>
      </div>

      <!--    isAcc = true-->
      <div class="wrap" *ngIf="isAcc">
        <div class="top"  [ngStyle]="{'background-image': 'url('+item?.img_url+')'}">
          <div class="local-delivery" *ngIf="delivery">
            <div class="button">local delivery & pick-up &nbsp;<i class="fa-solid fa-taxi"></i></div>
          </div>
          <div class="cover-overlay"></div>
        </div>
        <div class="bottom">
          <div class="title">{{item?.name}}</div>
          <div class="price"><span><b>From</b></span> &nbsp; <span>{{item?.price | currency:'USD': 'symbol':'1.2-2'}}</span></div>
        </div>
      </div>

      <ng-content select=".add-cart"></ng-content>
    </div>


  `,
  styleUrl: './item-card.component.css'
})
export class ItemCardComponent {

  @Input("delivery") delivery: boolean = true;
  @Input("item") item!: any;
  @Input("isAcc") isAcc = false;


  ngOnInit(){



  }
}
