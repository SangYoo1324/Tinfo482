import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-item-card',
  template:`
    <div class="card-wrap">
      <div class="top">
        <div class="local-delivery" *ngIf="delivery">
          <div class="button">local delivery & pick-up &nbsp;<i class="fa-solid fa-taxi"></i></div>
        </div>
        <div class="cover-overlay"></div>
      </div>
      <div class="bottom">
        <div class="title">ZZ Plant</div>
        <div class="price"><span><b>From</b></span> &nbsp; <span>$6.50</span></div>
      </div>

      <ng-content select=".add-cart"></ng-content>
    </div>
  `,
  styleUrl: './item-card.component.css'
})
export class ItemCardComponent {

  @Input("delivery") delivery: boolean = true;

}
