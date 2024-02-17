import { Component } from '@angular/core';

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
        <div *ngFor="let item of itemObjectArray let i=index" class="col-lg-3 box">
          <app-item-card [routerLink]="'/flowers/'+item.id" *ngIf=" i !==3"></app-item-card>
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


  itemObjectArray = [
    {
      name: "aaaaaa",
      price: 1,
    id:1
    },
    {
      name: "aaaaaa",
      price: 1,
      id:1},
    {
      name: "aaaaaa",
      price: 1,
      id:1},
    {
      name: "aaaaaa",
      price: 1,
      id:1},
    {
      name: "aaaaaa",
      price: 1,
      id:1},
    {
      name: "aaaaaa",
      price: 1,
      id:1},
    {
      name: "aaaaaa",
      price: 1,
      id:1},
    {
      name: "aaaaaa",
      price: 1,
      id:1},
    {
      name: "aaaaaa",
      price: 1,
      id:1}
  ]


}
