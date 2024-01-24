import { Injectable } from '@angular/core';
import {AsnynchronousService} from "../service/asnynchronous.service";

@Injectable({
  providedIn: 'root'
})
export class MemberAuthService {

  expMin: number = 1;

  constructor( private asyncService: AsnynchronousService) { }

  expChecker(){ // true : expired  false: not expired
    const expSet = localStorage.getItem("exp");
    if(expSet){
      const expTimeStamp = JSON.parse(expSet);
      const expirationTime = new Date(expTimeStamp).getTime();
      console.log("exp Time:::"+ new Date(expTimeStamp).toString());
      return (new Date().getTime() > expirationTime)

    }else return false;

  }

  public setUsernameEmail(username:string, email:string){
    localStorage.setItem("username", JSON.stringify(username));
    localStorage.setItem("email", JSON.stringify(email));
    localStorage.setItem("exp", JSON.stringify(new Date().getTime()+this.expMin* 60*1000));
  }

  public getusernameEmail(){
    if(this.expChecker()){localStorage.clear();
      this.asyncService.isLoggedIn$.next(false);
      return}
    return { username: JSON.parse(localStorage.getItem("username")!),
          email: JSON.parse(localStorage.getItem("email")!)
    };
  }

  public setRoles(roles:any[]){


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

  // stream for logout button
  public clear(){
    this.asyncService.isLoggedIn$.next(false);
    localStorage.clear();
  }

  public isLoggedIn():boolean{
    if(this.expChecker()) this.clear();
    return (this.getRoles() !=null && this.getToken() !=null) as boolean;
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

}
