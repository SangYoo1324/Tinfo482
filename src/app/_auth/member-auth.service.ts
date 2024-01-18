import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MemberAuthService {

  constructor() { }

  public setUsernameEmail(username:string, email:string){
    localStorage.setItem("username", JSON.stringify(username));
    localStorage.setItem("email", JSON.stringify(email));
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
    localStorage.clear();
  }

  public isLoggedIn(){
    return this.getRoles() && this.getToken();
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
