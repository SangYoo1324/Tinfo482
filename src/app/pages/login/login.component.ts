import { Component } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ValidationComponent} from "./validation/validation.component";
import {MemberService} from "../../service/member.service";
import {FacebookLoginProvider, SocialAuthService, SocialUser} from "@abacritt/angularx-social-login";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  inputEmailPWUsername!: {email:string,password:string,  username:string, provider:string};
  isActivated: boolean= false;
  constructor(private memberService:MemberService, private authService:SocialAuthService) {
  }

  reactiveForm!:FormGroup;
  triggerVerification:boolean = false;
  ngOnInit(){
      this.reactiveForm = new FormGroup({
        email: new FormControl(null,[Validators.required, Validators.email]),
        password: new FormControl(null,Validators.required),
      });

      this.authService.authState.subscribe((user)=>{
        console.log(user);
        this.inputEmailPWUsername= {
          email: user.email,
          password: 'OAuth',
          username: user.name,
          provider: 'GOOGLE'
        }
        // also need to add provider GOOGLE
        this.isActivated = true;
        this.memberService.oAuthLogin(this.inputEmailPWUsername).subscribe((resp)=>{
            console.log(resp);
            this.triggerVerification =true;
            this.isActivated=  false;
        });
      });

  }

  onFormSubmit(){
    console.log(this.reactiveForm.value);
    this.isActivated = true;
    this.memberService.login(this.reactiveForm.value).subscribe((data:any)=>{
      this.isActivated = false;
      this.inputEmailPWUsername  = data;
      // backends server doesn't return password. So, manually inject password from login input
      this.inputEmailPWUsername.password = this.reactiveForm.value.password;
      this.triggerVerification = true;
    }, error => {
      alert("ID & Password not matching please try again");
      this.isActivated= false;
    });
  }


  facebook_login(){
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID).then((userData:SocialUser)=>{
    console.log('Facebook login::::+userdata');

    });
  }
}
