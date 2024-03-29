import { Injectable } from '@angular/core';

import {HttpClient, HttpHeaders} from "@angular/common/http";
import {MemberAuthService} from "../_auth/member-auth.service";
import {env_var} from "../_env/env.now";
import {Address} from "../../interfaces";
import {BehaviorSubject, Observable, Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class MemberService {
  API_PATH = env_var.envNow;
  requestHeader =new HttpHeaders({"No-Auth": "True"});
  constructor(private httpClient:HttpClient) { }

  signup(signupData:any){
    return this.httpClient.post(this.API_PATH+"/api/signup",signupData, {headers:this.requestHeader});
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


  userApiTest(){
    return this.httpClient.get(this.API_PATH+"/api/user/test");
    // { responseType: 'text' }
  }

  adminApiTest(){
    return this.httpClient.get(this.API_PATH+"/api/admin/test");
  }

  oAuthLogin(userRequestDto:any){
    return this.httpClient.post(this.API_PATH+"/api/oauth/login",userRequestDto);
    // {responseType: 'text'}
  }

  getLoginPersistTime(){
    return this.httpClient.get(this.API_PATH+"/api/login/persisttime")
    // {responseType: 'text'}
  }



    addressDataStream:BehaviorSubject<any> = new BehaviorSubject<any>(null);

  getAddress(id: number){
    console.log("user_id : "+ id);
    return this.httpClient.get(this.API_PATH+"/api/address/"+id);
  }


  updateAddress(id: number, address:Address){
    return this.httpClient.patch(this.API_PATH+"/api/address/"+id, address);
  }
}
