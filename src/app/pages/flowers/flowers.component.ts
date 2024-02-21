import { Component } from '@angular/core';
import {BehaviorSubject, map, Observable} from "rxjs";
import {ItemService} from "../../_service/item.service";
import {DomSanitizer} from "@angular/platform-browser";

@Component({
  selector: 'app-flowers',
  template:`
    <app-page-title
    [title]="'Flowers'"
    [subTitle]="'Pick & up flowers you want to buy..'"
    ></app-page-title>

    <section>

      <div class="container">

        <h1>Send Flowers</h1>
        <div class="info-wrap">
            <div class="numbers"><p>17 items</p></div> <div class="horizontal-bar"><p></p></div>

          <div class="select-wrap">
            <div class="second-wrap">
              <span>FILTER &nbsp;<i class="fa-solid fa-angle-down"></i></span>
              <select>
                <option value="default">ALL</option>
                <option value="option1">Option 1</option>
                <option value="option2">Option 2</option>
                <option value="option3">Option 3</option>
              </select>
            </div>

          </div>



        </div>

      </div>

    </section>
    <div class="container">
      <div class="row">
        <div *ngFor="let item of (completeItems | async) let i=index" class="col-lg-3 box">
          <app-item-card  *ngIf="i !== 3"
            [item]="item"
            [routerLink]="'/flowers/'+item.flowerDto.id"></app-item-card>


          <div class="placeholder" *ngIf="i ===3">
            <div class="wrap">
              <p>Looking for same day flower delivery?
                Call our Shop to speak to a florist!</p>
            </div>
          </div>
        </div>

      </div>

    </div>

  `,
  styleUrl: './flowers.component.css'
})
export class FlowersComponent {

  constructor(private itemService:ItemService, private sanitizer: DomSanitizer) {
  }

  completeItemStream$!:BehaviorSubject<any>;

  completeItems!: Observable<any>;

  dummy: any = null;

  ngOnInit(){
   this.completeItemStream$ = this.itemService.completeItemListDataStream;

   this.completeItemStream$.subscribe(obs=>{

     this.completeItems = obs.pipe(
         map((obs:any[]) => {
           // insert dummy object for 1st row 4th column placeholder
           return [...obs.slice(0, 3), this.dummy, ...obs.slice(3)];
         }
         ))
   });






  }



}
