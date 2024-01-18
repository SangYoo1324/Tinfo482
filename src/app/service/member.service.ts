import { Injectable } from '@angular/core';
import {envNow} from "../_env/env.now";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {MemberAuthService} from "../_auth/member-auth.service";

@Injectable({
  providedIn: 'root'
})
export class MemberService {
  API_PATH = envNow;
  requestHeader =new HttpHeaders({"No-Auth": "true"});
  constructor(private httpClient:HttpClient) { }

  signup(signupData:any){
    return this.httpClient.post(this.API_PATH+"/api/signup",signupData);
  }

  login(signInData:any){
    return this.httpClient.post(this.API_PATH+"/api/login",signInData, {headers:this.requestHeader});

  }

  validation(verificationNumber:string, inputEmailPWUsername:any){
    let formdata = new FormData();
    formdata.append('verificationCode',verificationNumber);
    for(const key in inputEmailPWUsername){
      if(inputEmailPWUsername.hasOwnProperty(key)){
        console.log(key);
        formdata.append(key,inputEmailPWUsername[key]);
      }
    }
    formdata.delete('address');

  formdata.forEach((value,key)=>{
    console.log(`${key}: ${value}`)
  })

    return this.httpClient.post(this.API_PATH+"/api/mfa/validate",formdata, {headers:this.requestHeader});
  }

}
