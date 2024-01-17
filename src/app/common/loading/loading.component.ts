import {Component, Input, signal, Signal} from '@angular/core';
import {NgForOf, NgIf} from "@angular/common";



@Component({
  selector: 'app-loading',
  standalone: true,
  imports: [
    NgForOf,
    NgIf
  ],
 template: `
   <div class="loader" *ngIf="isActivated">
     <div class="spinner-wrap">
       <div class="spinner-border" role="status">
       </div>
     </div>
     <div class="text-wrap">
       <div class="loading-text"> &nbsp;{{subject}} Processing <span *ngFor="let i of dotsSignal()">{{i}}</span></div>
     </div>

   </div>
 `,
  styleUrl: './loading.component.css'
})
export class LoadingComponent {
    @Input() subject:string= 'loading';
    @Input() isActivated:boolean = false;

    dotsSignal= signal(['.']);


    ngOnInit(){
      setInterval(()=>{
        this.dotsSignal.update(value => {if(value.length ===4) return ['.'];
          return ['.', ...value]});
      }, 500);
    }



}
