import { Injectable } from '@angular/core';
import {envNow} from "../_env/env.now";
import {HttpClient, HttpHeaders} from "@angular/common/http";

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

  signIn(signInData:any){
    return this.httpClient.post(this.API_PATH+"/api/login",signInData, {headers:this.requestHeader});

  }

}
