import { Component } from '@angular/core';
import {slideInRouterAnimation} from "./app.animation";

@Component({
  selector: 'app-root',
  template:`
    <app-header></app-header>
    <div [@slideInRouterAnimation]="o.isActivated ? o.activatedRoute : ''">
      <router-outlet #o="outlet"></router-outlet>

    </div>
  `,
  styleUrls: ['./app.component.css'],
  animations: [slideInRouterAnimation]
})
export class AppComponent {
  title = 'tinfo482';
}
