import {Component, ElementRef, Input, QueryList, ViewChild, ViewChildren} from '@angular/core';
import {MemberService} from "../../../service/member.service";
import {Router} from "@angular/router";
import {MemberAuthService} from "../../../_auth/member-auth.service";
import {AsnynchronousService} from "../../../service/asnynchronous.service";

@Component({
  selector: 'app-validation',
  template: `
<!--    [ngStyle]="{display: trigger? 'flex': 'none'}"-->
    <section >
      <div class="container">

        <div class="wrap">
          <h3>Email Verification</h3>
          <p>Please enter your 6 digit verfication code given from the email address </p>
          <p> samuel13241&#64;hotmail.co.kr</p>
          <h5>Verification Code expires in:  </h5>
          <app-timer></app-timer>

          <div id="verification-inputs" class="verification-inputs">
            <input type="text" maxlength="1" (input)="onInput(0)" (keydown)="onBackspace($event,0)" #input>
            <input type="text" maxlength="1" (input)="onInput(1)" (keydown)="onBackspace($event,1)" #input>
            <input type="text" maxlength="1" (input)="onInput(2)" (keydown)="onBackspace($event,2)" #input>
            <input type="text" maxlength="1" (input)="onInput(3)" (keydown)="onBackspace($event,3)" #input>
            <input type="text" maxlength="1" (input)="onInput(4)" (keydown)="onBackspace($event,4)" #input>
            <input type="text" maxlength="1" (input)="onInput(5)" (keydown)="onBackspace($event,5)" #input>
          </div>

          <div class="option-wrap">
            <h5>Didn't get the email?</h5>
            <button class="resend-code">resend Code</button>
            <div class="submit-btn-wrap">
              <button (click)="onSubmit()" class="submit-btn">Complete Verification</button>
            </div>


          </div>
        </div>

      </div>
    </section>

  `,
  styleUrl: './validation.component.css'
})
export class ValidationComponent {

  constructor(private memberService:MemberService,private router:Router,private memberAuthService:MemberAuthService,
              private asyncService: AsnynchronousService){}

  @ViewChildren('input') inputs!: QueryList<ElementRef>;

  @Input()
  inputEmailPWUsername!:{email:string, password:string, username:string}
  @Input()
  trigger: boolean= false;

  ngAfterViewInit(){
    // Focus the first input when initiated
    if (this.inputs && this.inputs.length > 0) {
      this.inputs.first.nativeElement.focus();
    }
  }

  onInput(index:number){
    const currentInput = this.inputs.toArray()[index];
    const nextIdx = index+1;

    if(currentInput.nativeElement.value && this.inputs.toArray()[nextIdx]){
      this.inputs.toArray()[nextIdx].nativeElement.focus();
    }
  }

  onBackspace(event:KeyboardEvent,index:number){
    const currentInput = this.inputs.toArray()[index];
    const prevIndex = index - 1;

    if(event.key == 'Backspace' && index>0 && !currentInput.nativeElement.value){
      event.preventDefault();// Prevent browser navigation on Backspace key press
      if (this.inputs.toArray()[prevIndex]) {
        this.inputs.toArray()[prevIndex].nativeElement.focus();
      }
    }
  }

  onSubmit(){
     let verificationNumber = ``;
    this.inputs.toArray().forEach((e)=>{verificationNumber= verificationNumber+e.nativeElement.value});
    console.log(verificationNumber);
    console.log("data received from login:::"+this.inputEmailPWUsername);
    this.memberService.validation(verificationNumber,this.inputEmailPWUsername).subscribe((resp:any)=>{
      console.log(resp);
      this.memberAuthService.setRoles(resp.roles);
      this.memberAuthService.setToken(resp.accessToken);
      this.memberAuthService.setUsernameEmail(resp.username,resp.email);
      this.memberAuthService.setExpirationTime();
      this.asyncService.isLoggedIn$.next(true);
      alert("Login Success! Hello, "+ resp.username);


      this.router.navigate(['']);
    },error => {
      alert("Login Failed... Please check your verification code");
    });
  }
}
