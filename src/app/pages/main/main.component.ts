import { Component } from '@angular/core';
import {MemberService} from "../../service/member.service";


@Component({
  selector: 'app-main',
  templateUrl:'./main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent {

  constructor(private memberService: MemberService) {

  }

  adminApiTest(){
    this.memberService.adminApiTest().subscribe((resp)=>{
      console.log(resp);
      alert("You are Authorized Admin USER...");
    }, (err)=>{
        console.log(err);
        alert("You're not authorized to use Admin privileged API...");
    })
  }

  userApiTest(){
    this.memberService.userApiTest().subscribe((resp)=>{
      alert("You are authenticated user...");
      console.log(resp);
    }, )
  }
}
