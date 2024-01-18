import { Component } from '@angular/core';

@Component({
  selector: 'app-page-not-found',
  standalone: true,
  imports: [],
  template:`
    <div class="con">
      <div class="wrap">
        <p>404: Page Not Found</p>

        <p>This page you are looking for cannot be found or you do not have access to this page.</p>

      </div>

    </div>

    <style>


      .con{
        text-align: center;

        height: 100vh;
        background-color: lightgrey;
      }


      .wrap{
        font-size: 2rem;
        font-weight: bold;
        padding-top: 5rem;
      }

    </style>

  `,
  styleUrl: './page-not-found.component.css'
})
export class PageNotFoundComponent {

}
