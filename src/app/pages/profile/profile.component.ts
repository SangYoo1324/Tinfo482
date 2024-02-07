import { Component } from '@angular/core';
import {transparency, widthChange} from "../../app.animation";
import {MemberService} from "../../service/member.service";
import {Address} from "../../../interfaces";
import {filter, Observable} from "rxjs";

@Component({
  selector: 'app-profile',
  template: `
    <app-page-title
    [title]="'Profile'"
    [subTitle]="'You can edit your profile info and also your shipping address..'"
    ></app-page-title>
    <section>

    <div class="container">

      <h1> My Account</h1>

      <h5 class="mb-5">Hello, {{username}}</h5>

      <div class="row">

        <div class="col-lg-6 account">
          <h3>General User Info</h3>
          <div class="email_wrap">
            <label class="fw-bold">Email Address: &nbsp;</label>
            <span>{{emailAddress}}</span>
          </div>
          <div class="username_wrap">
            <label class="fw-bold">Access Authorization: &nbsp;</label>
            <span>{{access_role}}</span>
          </div>
          <div class="login_dura_wrap">
            <label class="fw-bold">Login Session expires in: &nbsp;</label>
            <span>300 mins</span>
          </div>
          <div class="password_change_request_wrap">
            <label class="fw-bold">Password: &nbsp;</label>
            <span class="mt-3">***********</span> <button class="pw_chng_btn btn btn-outline-success">PW Change Request ></button>

            <p class="note">
              <b>* Please note</b> <br>
              Email will be sent to your account email Address with
            the link of PW change request form...</p>
          </div>
        </div>

        <div class="col-lg-6 address">
          <h3>Address Info</h3>
          <div class="addr_wrap">
            <label class="fw-bold">Address_1: &nbsp;</label>
            <ng-container *ngIf="!addr_update_mode">
              <span>{{address1}}</span>
              <span *ngIf="address1 === undefined">* Update Required ASAP *</span>
            </ng-container>
            <input [(ngModel)]="address1" type="text" *ngIf="addr_update_mode">
          </div>
          <div class="addr_wrap">
            <label class="fw-bold">City: &nbsp;</label>
            <ng-container *ngIf="!addr_update_mode">
              <span>{{city}}</span>
              <span *ngIf="city === undefined">* Update Required ASAP *</span>
            </ng-container>
            <input [(ngModel)]="city" type="text" *ngIf="addr_update_mode">

          </div>
          <div class="addr_wrap">
            <label class="fw-bold">State: &nbsp;</label>
            <ng-container *ngIf="!addr_update_mode">
              <span>{{state}}</span>
              <span *ngIf="state === undefined">* Update Required ASAP *</span>
            </ng-container>
            <input [(ngModel)]="state" type="text" *ngIf="addr_update_mode">
          </div>
          <div class="addr_wrap">
            <label class="fw-bold">ZipCode: &nbsp;</label>
            <ng-container *ngIf="!addr_update_mode">
              <span>{{zipCode}}</span>
              <span *ngIf="zipCode === undefined">* Update Required ASAP *</span>
            </ng-container>
            <input [(ngModel)]="zipCode" type="text" *ngIf="addr_update_mode">
          </div>

          <div class="addr-update-btn-wrap">
            <button *ngIf="!addr_update_mode" class="btn btn-outline-primary addr-update-btn" (click)="triggerAddrEdit()">
              Update Address Info</button>
            <button *ngIf="addr_update_mode" class="btn btn-outline-primary addr-update-btn" (click)="saveAddr()"
            >Save</button>
          </div>

        </div>

      </div>


      <div class="line"></div>
      <div class="transaction-history">
        <h3>Transaction History</h3>
      </div>

    </div>

  </section>`,
  animations:[
  ],
  styleUrl: './profile.component.css'
})
export class ProfileComponent {

  constructor(private memberService:MemberService) {
  }
  id?:number|null;
  username: string |null = '';
  emailAddress: string| null = '';
  access_role: string|null = '';
  login_session_duration: string|null = '';

  address?:Address;

  address1?: string;
  city?:string;
    state?:string;
  zipCode?:string;


  addr_update_mode: boolean= false;

  ngOnInit(){
    this.username = localStorage.getItem("username");
    this.emailAddress = localStorage.getItem("email");
    this.access_role = JSON.parse(localStorage.getItem("roles")!)[0].authority;
    this.id = parseInt(localStorage.getItem("id")!);


    this.memberService.addressDataStream.
      pipe(
      //null check
      filter(obs=> obs !==null)
      ).
      subscribe((obs:Observable<any>)=> {
        obs.subscribe(
          (resp:any)=>{
            console.log("obs::");
            console.log(resp);
            this.address1 = resp.address1;
            this.city = resp.city;
            this.state = resp.state;
            this.zipCode = resp.zipCode;

          })


      });

    this.memberService.addressDataStream.next(this.memberService.getAddress(this.id!)
    );
  }


  ngAfterViewInit(){

  }

  triggerAddrEdit(){
    this.addr_update_mode= true;
  }

  saveAddr(){
    this.address = {
      address1: this.address1!,
      city: this.city!,
      state: this.state!,
      zipCode: this.zipCode!
    }

    this.memberService.updateAddress(this.id!,this.address).subscribe((resp)=>{
      console.log(resp);

      alert("successfully updated address");
    this.memberService.addressDataStream.next(this.memberService.getAddress(this.id!));
    })

    this.addr_update_mode= false;
  }


}
