import {Component, Input} from '@angular/core';
import {NgClass, NgStyle} from "@angular/common";

@Component({
  selector: 'app-general-modal',
  standalone: true,
  imports: [
    NgClass,
    NgStyle
  ],
  template: `
    <div [ngClass]="{'isActive': isActive}" id="myModal" class="modal">
      <div class="modal-content" [ngStyle]="{'width': modalWidth+'%'}">
        <div class="close" id="closeModalBtn">&times;</div>
        <div class="header">
          <ng-content select="[contentLocation=header]"></ng-content>
        </div>
        <div class="body">
          <ng-content select="[contentLocation=body]"></ng-content>
        </div>
        <ng-content select="[contentLocation=footer]"></ng-content>
      </div>

      ng-content
    </div>
  `,
  styles:[
    `.modal {
      position: fixed;
      z-index: 1;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      overflow: auto;
      background-color: rgba(0,0,0,0.7);
    }

    .modal-content {
      background-color: #fefefe;
      padding: 20px;
      border: 1px solid #888;
      width: 70%;
      margin: 20% auto;
    }

    .close {
      color: #aaa;
      float: right;
      font-size: 28px;
      font-weight: bold;
      cursor: pointer;
      width: fit-content;
      margin-left: auto;
    }

    .close:hover,
    .close:focus {
      color: black;
      text-decoration: none;
      cursor: pointer;
    }

    .isActive{
      display: block;
    }`

  ]




})
export class GeneralModalComponent {

  @Input() isActive: boolean= true;
  @Input() modalWidth:number = 40;


}
