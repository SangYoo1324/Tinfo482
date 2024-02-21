import { Component } from '@angular/core';
import {ItemService} from "../../_service/item.service";
import {error} from "@angular/compiler-cli/src/transformers/util";
import {BehaviorSubject} from "rxjs";

@Component({
  selector: 'app-admin',
  template:` <app-page-title
  [title]="'Admin Panel'"
  [subTitle]="'Authorized Access Only..'"
  ></app-page-title>

  <app-post-flower></app-post-flower>
  <div class="line container"></div>
  <app-list-admin-panel
  [items$]="flowerList$"
  [title]="'Flower'"
  [displayedColumn]="['id','name','category', 'delivery', 'price', 'stock', 'delete']"
  [actualDisplayedColumn]="['id','name','category', 'delivery', 'price', 'stock']"
  >
  </app-list-admin-panel>

<!--  [length]="flowerList.length"-->

  <app-post-acc></app-post-acc>
  <div class="line container"></div>
    <app-list-admin-panel
    [items$]="accList$"
    [title]="'Acc'"
    [displayedColumn]="['id','name', 'price', 'stock', 'delete']"
    [actualDisplayedColumn]="['id','name', 'price', 'stock']"
    >


    </app-list-admin-panel>

<!--  [length]="accList.length"-->

  <div class="line container"></div>

<app-complete-item-list *ngIf="completeItemList$"
    [title] = "'complete Item Package'"
    [completeItemList$]="completeItemList$"
></app-complete-item-list>

  `,
  styleUrl: './admin.component.css'
})
export class AdminComponent {

  constructor(private itemService:ItemService) {
  }



  flowerList$!:BehaviorSubject<any>;
  accList$!:BehaviorSubject<any>;
  completeItemList$!:BehaviorSubject<any>;

  ngOnInit(){

    // //fetching flower inventory stream
    // this.itemService.flowerListDataStream.subscribe(obs=>{
    //   obs.subscribe(resp=>{
    //     console.log(resp);
    //     this.flowerList = resp;
    //     console.log("FLOWER LIST");
    //     console.log(this.flowerList);
    //   });
    // });
    //
    //
    // //fetching acc inventory stream
    // this.itemService.accListDataStream.subscribe(obs=>{
    //   obs.subscribe(resp=>{
    //     console.log(resp);
    //     this.accList = resp;
    //     console.log("ACC LIST");
    //     console.log(this.accList);
    //   })
    // })

    this.flowerList$ = this.itemService.flowerListDataStream;
    this.accList$ = this.itemService.accListDataStream;
    this.completeItemList$= this.itemService.completeItemListDataStream;




  }

}
