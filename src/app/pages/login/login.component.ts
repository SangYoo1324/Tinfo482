import { Component } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ValidationComponent} from "./validation/validation.component";
import {MemberService} from "../../service/member.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  inputEmailPWUsername!: {email:string,password:string,  username:string};
  isActivated: boolean= false;
  constructor(private memberService:MemberService) {
  }

  reactiveForm!:FormGroup;
  triggerVerification:boolean = false;
  ngOnInit(){
      this.reactiveForm = new FormGroup({
        email: new FormControl(null,[Validators.required, Validators.email]),
        password: new FormControl(null,Validators.required),
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

}
