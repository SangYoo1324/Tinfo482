import {Component, ElementRef, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {BehaviorSubject, Observable} from "rxjs";
import {MemberService} from "../../service/member.service";

@Component({
  selector: 'app-signup',
  template: `

    <section id="signup">

      <div class="signup-container">
        <div class="wrap">
          <h1>Sign Up</h1>
          <form [formGroup]="reactiveForm" (ngSubmit)="onFormSubmit()" class="row">
            <div class="col-lg-6">
              <h3>General Info</h3>

              <!--        username    input-group-->
              <div class="mb-3">
                <div class="input-group">
                  <span class="input-group-text" id="basic-addon3">Username</span>
                  <input formControlName="username" type="text" class="form-control" id="basic-url"
                         aria-describedby="basic-addon3 basic-addon4">
                </div>
                <div class="form-text" id="basic-addon4">
                  <small *ngIf="reactiveForm.get('username')!.touched && reactiveForm.get('username')!.hasError('required')">*username
                    is required field</small>
                </div>
              </div>
              <!--       password     input-group-->
              <div class="mb-3">
                <div class="input-group">
                  <span class="input-group-text" id="basic-addon3">Password</span>
                  <input formControlName="password" type="password" class="form-control" id="basic-url"
                         aria-describedby="basic-addon3 basic-addon4">
                </div>
                <div *ngIf="reactiveForm.get('password')!.touched && reactiveForm.get('password')!.hasError('required')" class="form-text" id="basic-addon4"><small>*password is required field</small></div>
              </div>
              <!--        confirm password    input-group-->
              <div class="mb-3">
                <div class="input-group">
                  <span class="input-group-text" id="basic-addon3">Confirm Password</span>
                  <input [(ngModel)]="confirmPasswordValue"
                         [ngModelOptions]="{standalone: true}"
                         (ngModelChange)="confirmPasswordChange()"
                         #confirmPassword="ngModel" name="confirmPassword" type="password" class="form-control" id="basic-url"
                         aria-describedby="basic-addon3 basic-addon4">
                </div>
                <div class="form-text" id="basic-addon4"><small *ngIf="!isPasswordMatching && confirmPassword.touched">*password is not matching</small></div>
              </div>
              <!--         email   input-group-->
              <div class="mb-3">
                <div class="input-group">
                  <span class="input-group-text" id="basic-addon3">Email</span>
                  <input formControlName="email" type="text" class="form-control" id="basic-url"
                         aria-describedby="basic-addon3 basic-addon4">
                </div>
                <div class="form-text" id="basic-addon4"><small
                  *ngIf="reactiveForm.get('email')!.touched && reactiveForm.get('email')!.hasError('required')">
                  *email is required field</small></div>
              </div>


            </div>
            <div class="col-lg-6">
              <h3>Shipping Info</h3>

              <!--        address1    input-group-->
              <div class="mb-3">
                <div class="input-group">
                  <span class="input-group-text" id="basic-addon3">Address 1</span>
                  <input formControlName="address1" type="text" class="form-control" id="basic-url"
                         aria-describedby="basic-addon3 basic-addon4">
                </div>
                <div class="form-text" id="basic-addon4"><small
                  *ngIf="reactiveForm.get('address1')!.touched && reactiveForm.get('address1')!.hasError('required')"
                >*address1 is required field</small></div>
              </div>

              <!--         state   input-group-->
              <div class="mb-3">
                <div class="input-group">
                  <span class="input-group-text" id="basic-addon3">State</span>
                  <select formControlName="state" class="form-select" aria-label="Default select example">
                    <option *ngFor="let state of usaStates" [value]="state">{{state}}</option>

                  </select>
                </div>
                <div class="form-text" id="basic-addon4"><small
                  *ngIf="reactiveForm.get('state')!.touched && reactiveForm.get('state')!.hasError('required')"
                >*state is required field</small></div>

              </div>


              <!--        city   input-group-->
              <div class="mb-3">
                <div class="input-group">
                  <span class="input-group-text" id="basic-addon3">City</span>
                  <input formControlName="city" type="text" class="form-control" id="basic-url"
                         aria-describedby="basic-addon3 basic-addon4">
                </div>
                <div class="form-text" id="basic-addon4"><small
                  *ngIf="reactiveForm.get('city')!.touched && reactiveForm.get('city')!.hasError('required')"
                >*city is required field</small></div>
              </div>

              <!--         zipCode   input-group-->
              <div class="mb-3">
                <div class="input-group">
                  <span class="input-group-text" id="basic-addon3">ZIP Code</span>
                  <input formControlName="zipCode" type="text" class="form-control" id="basic-url"
                         aria-describedby="basic-addon3 basic-addon4">
                </div>
                <div class="form-text" id="basic-addon4"><small
                  *ngIf="reactiveForm.get('zipCode')!.touched && reactiveForm.get('zipCode')!.hasError('required')"
                >*zipCode is required field</small></div>
              </div>


            </div>
            <button class="submit-btn" type="submit" [disabled]="!reactiveForm.valid || !isPasswordMatching" >Submit</button>
          </form>
        </div>
      </div>


    </section>
    <app-footer></app-footer>
  `,
  styleUrl: './signup.component.css'
})
export class SignupComponent {

  constructor(private router:Router, private memberService:MemberService) {
  }


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

   reactiveForm!: FormGroup;
   confirmPasswordValue:string = '';
   confirmPasswordBSubj:BehaviorSubject<string> = new BehaviorSubject<string>("");
   isPasswordMatching:boolean = false;

   ngOnInit(){
     this.reactiveForm = new FormGroup({
       username: new FormControl(null,Validators.required),
       password: new FormControl(null, Validators.required),
       email: new FormControl(null, [Validators.required, Validators.email]),
       address1:new FormControl(null, Validators.required),
       city: new FormControl(null, Validators.required),
       state: new FormControl(null, Validators.required),
       zipCode: new FormControl(null, Validators.required),
     });

     this.reactiveForm.get('password')!.valueChanges.subscribe((value)=>{
       console.log(value);
       this.isPasswordMatching = (value === this.confirmPasswordValue);
       console.log(this.isPasswordMatching);
     });

    this.confirmPasswordBSubj.subscribe((confPassword)=>{
      this.isPasswordMatching = confPassword === this.reactiveForm.get('password')!.value;
    });



   }

  confirmPasswordChange(){
    this.confirmPasswordBSubj.next(this.confirmPasswordValue);
  }

   onFormSubmit(){
     console.log(this.reactiveForm.value);
     const submittedForm = this.reactiveForm.value;
     const submitForm = {
       username: submittedForm.username,
       email: submittedForm.email,
       password: submittedForm.password,
       address:{
         address1: submittedForm.address1,
         city: submittedForm.city,
         state: submittedForm.state,
         zipCode: submittedForm.zipCode
       }
     }
     console.log(submitForm);
     //async when login api finished
     this.memberService.signup(submitForm).subscribe((data:any)=>{
       alert("Login Success, hello "+data.username+"!");
     }, (err)=>{
       alert("Something went wrong...");
     });
     // this.router.navigate(['/login']);

   }




}
