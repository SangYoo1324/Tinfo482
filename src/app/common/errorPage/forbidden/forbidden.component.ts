import { Component } from '@angular/core';

@Component({
  selector: 'app-forbidden',
  standalone: true,
  imports: [],
  template:`
    <div class="con">
      <div class="wrap">
        <p>403: Forbidden</p>

        <p>Get Out! ㅗ</p>

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
  styleUrl: './forbidden.component.css'
})
export class ForbiddenComponent {

}
