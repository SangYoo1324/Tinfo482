import { Injectable } from '@angular/core';
import {env_var} from "../_env/env.now";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {BehaviorSubject, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  constructor(private httpClient:HttpClient) { }
  requestHeader =new HttpHeaders({"No-Auth": "True"});
  private api_url = env_var.envNow;

  postFlower(formData:FormData){
    return this.httpClient.post(this.api_url+"/api/flower", formData);
  }

  postAcc(formData:FormData){
    return this.httpClient.post(this.api_url+"/api/acc", formData);
  }


  flowerListDataStream: BehaviorSubject<Observable<any>> = new BehaviorSubject(this.fetchFlowers());
  fetchFlowers(){
    return this.httpClient.get(this.api_url+"/api/flowers", {headers: this.requestHeader});
  }



  accListDataStream:BehaviorSubject<Observable<any>> = new BehaviorSubject<Observable<any>>(this.fetchAccs());
  fetchAccs(){
    return this.httpClient.get(this.api_url+"/api/accs", {headers:this.requestHeader});
  }

}
