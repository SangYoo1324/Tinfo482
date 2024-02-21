import { Injectable } from '@angular/core';
import {AsnynchronousService} from "../_service/asnynchronous.service";
import {MemberService} from "../_service/member.service";

@Injectable({
  providedIn: 'root'
})
export class MemberAuthService {

  constructor( private asyncService: AsnynchronousService, private memberService:MemberService) { }

  public getId(){
    return JSON.parse(localStorage.getItem("id")!);
  }

  public setUsernameEmail(username:string, email:string, id:number){
    localStorage.setItem("username", JSON.stringify(username));
    localStorage.setItem("email", JSON.stringify(email));
    localStorage.setItem("id", JSON.stringify(id));
  }

  public getusernameEmail(){
    return { username: JSON.parse(localStorage.getItem("username")!),
          email: JSON.parse(localStorage.getItem("email")!)
    };
  }

  public setRoles(roles:any[]){
    console.log("setRoles::::"+ roles);

    localStorage.setItem("roles", JSON.stringify(roles));
  }

  public getRoles(){
    return JSON.parse(localStorage.getItem("roles")!);
  }

  public setToken(jwtToken:string){
    console.log("JwtToken has  been stored to local cache...");
    localStorage.setItem("jwtToken", jwtToken);
  }

  public getToken(){
    return localStorage.getItem("jwtToken");
  }

  public clear(){
    this.asyncService.isLoggedIn$.next(false);
    localStorage.clear();
  }

  public isLoggedIn():boolean{
    // this.memberService.getLoginPersistTime().subscribe((time)=>{
    //
    // });

    console.log("time passed :: "+ this.getExpirationTime() < new Date().getTime().toString() );
    return (this.getRoles() !=null && this.getToken() !=null && this.getExpirationTime() !=null && this.getExpirationTime() > new Date().getTime()) as boolean;
  }

  public roleMatch(allowedRoles: string[]): boolean{
    console.log("Allowed roles::::"+allowedRoles);
    let isMatch = false;
    // role info stored in localStorage
    const memberRoles:any = this.getRoles();
    if(memberRoles !=null){
      allowedRoles.forEach(e=>{
        if(memberRoles[0].authority === e){
          console.log(memberRoles[0].authority);
          // role is matching so set isMatch true
          isMatch = true;
        }
      });
    }

    return isMatch;
  }

  setExpirationTime(){
    const exp = new Date().getTime() + 60*300*1000;
    localStorage.setItem('exp', exp.toString());
}

  getExpirationTime(){
    // this.memberService.getLoginPersistTime().subscribe((time)=>{
    // console.log("expTime:::"+time);
    // })
    return parseInt(localStorage.getItem('exp')!,10);
  }
}
