import {Component, ElementRef, Input, ViewChild} from '@angular/core';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {transparency, widthChange} from "../../app.animation";

@Component({
  selector: 'app-page-title',
  standalone: true,
  imports: [],
  animations:[
    transparency,
    widthChange],
  template: `
    <section class="page_title">


      <div class="text_wrap">
        <h1 [@animate_transparency]="titlePageAnimationInit" #title>{{titleString}}</h1>
        <div class="line" [@animate_widthChange]="titlePageAnimationInit"></div>
        <p [@animate_transparency]="titlePageAnimationInit" #subTitle>{{subTitleString}}</p>
      </div>


    </section>
  `,
  styleUrl: './page-title.component.css'
})
export class PageTitleComponent {

  @Input("title")
  titleString!:string;

  @Input("subTitle")
  subTitleString!:string;

  @ViewChild('title') title1!: ElementRef;
  @ViewChild('subTitle') subTitle1!: ElementRef;

  titlePageAnimationInit:boolean = false;

  ngAfterViewInit(){
    setTimeout(()=>{
      this.titlePageAnimationInit= true;
    })
  }

  ngOnDestroy(){
    this.titlePageAnimationInit= false;
  }
}
