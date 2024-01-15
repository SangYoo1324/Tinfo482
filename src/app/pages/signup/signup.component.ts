import { Component } from '@angular/core';

@Component({
  selector: 'app-signup',
  template: `

  <section id="signup">

    <div class="signup-container">
      <div class="wrap">
        <h1>Sign Up</h1>
       <form class="row">
        <div class="col-lg-6">
          <h3>General Info</h3>

<!--            input-group-->
            <div class="mb-3">
              <div class="input-group">
                <span class="input-group-text" id="basic-addon3">Username</span>
                <input type="text" class="form-control" id="basic-url" aria-describedby="basic-addon3 basic-addon4">
              </div>
              <div class="form-text" id="basic-addon4">Example help text goes outside the input group.</div>
            </div>
            <!--            input-group-->
            <div class="mb-3">
              <div class="input-group">
                <span class="input-group-text" id="basic-addon3">Password</span>
                <input type="text" class="form-control" id="basic-url" aria-describedby="basic-addon3 basic-addon4">
              </div>
              <div class="form-text" id="basic-addon4">Example help text goes outside the input group.</div>
            </div>
            <!--            input-group-->
            <div class="mb-3">
              <div class="input-group">
                <span class="input-group-text" id="basic-addon3">Confirm Password</span>
                <input type="text" class="form-control" id="basic-url" aria-describedby="basic-addon3 basic-addon4">
              </div>
              <div class="form-text" id="basic-addon4">Example help text goes outside the input group.</div>
            </div>
            <!--            input-group-->
            <div class="mb-3">
              <div class="input-group">
                <span class="input-group-text" id="basic-addon3">Email</span>
                <input type="text" class="form-control" id="basic-url" aria-describedby="basic-addon3 basic-addon4">
              </div>
              <div class="form-text" id="basic-addon4">Example help text goes outside the input group.</div>
            </div>


        </div>
        <div class="col-lg-6">
          <h3>Shipping Info</h3>

            <!--            input-group-->
            <div class="mb-3">
              <div class="input-group">
                <span class="input-group-text" id="basic-addon3">Address 1</span>
                <input type="text" class="form-control" id="basic-url" aria-describedby="basic-addon3 basic-addon4">
              </div>
              <div class="form-text" id="basic-addon4">Example help text goes outside the input group.</div>
            </div>
            <!--            input-group-->
            <div class="mb-3">
              <div class="input-group">
                <span class="input-group-text" id="basic-addon3">City</span>
                <input type="text" class="form-control" id="basic-url" aria-describedby="basic-addon3 basic-addon4">
              </div>
              <div class="form-text" id="basic-addon4">Example help text goes outside the input group.</div>
            </div>
            <!--            input-group-->
            <div class="mb-3">
              <div class="input-group">
                <span class="input-group-text" id="basic-addon3">State</span>
                <select class="form-select" aria-label="Default select example">
                  <option *ngFor="let state of usaStates" [value]="state">{{state}}</option>

                </select>
              </div>
              <div class="form-text" id="basic-addon4">Example help text goes outside the input group.</div>

            </div>
            <!--            input-group-->
            <div class="mb-3">
              <div class="input-group">
                <span class="input-group-text" id="basic-addon3">ZIP Code</span>
                <input type="text" class="form-control" id="basic-url" aria-describedby="basic-addon3 basic-addon4">
              </div>
              <div class="form-text" id="basic-addon4">Example help text goes outside the input group.</div>
            </div>


        </div>
        </form>
      </div>
    </div>


  </section>
    <app-footer></app-footer>
  `,
  styleUrl: './signup.component.css'
})
export class SignupComponent {


  // 미국 주(State) 배열
   usaStates:string[] = [
    "Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado",
    "Connecticut", "Delaware", "Florida", "Georgia", "Hawaii", "Idaho",
    "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky", "Louisiana",
    "Maine", "Maryland", "Massachusetts", "Michigan", "Minnesota",
    "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada",
    "New Hampshire", "New Jersey", "New Mexico", "New York",
    "North Carolina", "North Dakota", "Ohio", "Oklahoma", "Oregon",
    "Pennsylvania", "Rhode Island", "South Carolina", "South Dakota",
    "Tennessee", "Texas", "Utah", "Vermont", "Virginia", "Washington",
    "West Virginia", "Wisconsin", "Wyoming"
  ];
}
