import { Component } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ValidationComponent} from "./validation/validation.component";
import {MemberService} from "../../service/member.service";
import {FacebookLoginProvider, GoogleLoginProvider, SocialAuthService} from "@abacritt/angularx-social-login";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  inputEmailPWUsername!: {email:string,password:string,  username:string};
  isActivated: boolean= false;
  reactiveForm!:FormGroup;
  triggerVerification:boolean = false;

  //social auth related
  user!:any;
  loggedIn!: boolean;
  constructor(private memberService:MemberService, private socialAuthService:SocialAuthService) {
  }


  ngOnInit(){
      this.reactiveForm = new FormGroup({
        email: new FormControl(null,[Validators.required, Validators.email]),
        password: new FormControl(null,Validators.required),
      });

      //Google Social Login
      this.socialAuthService.authState.subscribe((user)=>{
        this.user = user;
        this.loggedIn = (user!=null);
        console.log(this.user);
        this.isActivated = true;
        // trigger login api
        this.memberService.oAuth2Login({
          username: this.user.name,
          email: this.user.email,
          provider: "GOOGLE",
        }).subscribe((resp:any)=>{
          console.log("resp::::"+resp);

          this.inputEmailPWUsername = {
            email: resp.email,
            password: resp.password,
            username: resp.username
          }
          console.log(this.inputEmailPWUsername);

          //loading indicator
          this.isActivated = false;
          // 2FA modal active
          this.triggerVerification = true;
        });
      })
  }

  onFormSubmit(){
    console.log(this.reactiveForm.value);
    this.isActivated = true;
    this.memberService.login(this.reactiveForm.value).subscribe((data:any)=>{
      //loading indicator
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

  facebookOAuth2(){
    this.socialAuthService.signIn(FacebookLoginProvider.PROVIDER_ID).then((user:any) => {
      this.user = user;
      console.log(user);
      this.socialAuthService.signOut().then(()=>{
      //signin logic later
      });
    });

  }





}
