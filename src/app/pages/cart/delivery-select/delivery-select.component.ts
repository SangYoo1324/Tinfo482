import {Component, Output, ViewChild} from '@angular/core';
import {NgClass, NgForOf, NgIf} from "@angular/common";
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {MemberService} from "../../../_service/member.service";
import {ItemService} from "../../../_service/item.service";
import {MemberAuthService} from "../../../_auth/member-auth.service";
import {Address} from "../../../../interfaces";
import {PaypalComponent} from "./paypal/paypal.component";

@Component({
  selector: 'app-delivery-select',
  standalone: true,
  imports: [
    NgIf,
    FormsModule,
    NgForOf,
    ReactiveFormsModule,
    NgClass,
    PaypalComponent
  ],
  template: `

    <div class="container mb-[3rem] mt-[2rem]">

      <div class="wrap row">
        <div class="col-lg-6">
          <small class="text-gray-400"> ** Shipping & taxes calculated at checkout</small>

          <div class="select-box flex mt-[1.5rem]">

            <div class="box">
              <div  [ngClass]="{ 'selected': selectedMethod === 'Shipping'}" class="cover w-[95%] h-[100px] bg-gray-200 flex
              justify-center items-center rounded-[5px]" (click)="methodChange('Shipping')">
                <div class="text-box">
                  <i class="fa-solid fa-truck block text-center  mb-[5px] text-[1.5rem]"></i>
                  <p class="text-center">Shipping</p>
                </div>

              </div>
            </div>
            <div class="box">
              <div [ngClass]="{ 'selected': selectedMethod === 'Local Delivery'}" class="cover w-[95%] h-[100px] bg-gray-200 flex justify-center
              items-center rounded-[5px]" (click)="methodChange('Local Delivery')">
                <div class="text-box">
                  <i class="fa-solid fa-truck-fast block text-center mb-[5px] text-[1.5rem]"></i>
                  <p class="text-center">Local Delivery</p>
                </div>
              </div>
            </div>
            <div class="box">
              <div [ngClass]="{ 'selected': selectedMethod === 'Store Pickup'}" class="cover w-[95%] h-[100px] bg-gray-200 flex justify-center
               items-center rounded-[5px] " (click)="methodChange('Store Pickup')">
                <div class="text-box">
                  <i class="fa-solid fa-store block text-center  mb-[5px] text-[1.5rem]"></i>
                  <p class="text-center">Store Pickup</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="col-lg-6 flex justify-center items-center relative">
            <button *ngIf="reactiveForm && !checkoutReady" id="checkout-btn" (click)="chkoutBtnClick()"
                    [disabled]="!reactiveForm.valid" class="absolute"
                    > Proceed to Check Out</button>

          <div class="paypal-wrap">
            <app-paypal *ngIf="checkoutReady"></app-paypal>
          </div>

        </div>


      </div>


<!--      details-->

      <div class="row">
        <div class="col-lg-6">

          <div class="detail-wrap" *ngIf="selectedMethod === 'Local Delivery'">

            <div class="address-wrap">

              <form [formGroup]="reactiveForm" (ngSubmit)="onFormSubmit()" class="row">

                <h3 class="m-3">Shipping Info</h3>

                <!--        address1    input-group-->
                <div class="mb-3">
                  <div class="input-group">
                    <span class="input-group-text" id="basic-addon3">Address 1</span>
                    <input formControlName="address1" type="text" class="form-control" id="basic-url"
                           aria-describedby="basic-addon3 basic-addon4">
                  </div>
                  <div class="form-text" id="basic-addon4"><small
                    *ngIf="reactiveForm.get('address1')!.touched && reactiveForm.get('address1')!.hasError('required')"
                  >*address1 is required field</small></div>
                </div>

                <!--         state   input-group-->
                <div class="mb-3">
                  <div class="input-group">
                    <span class="input-group-text" id="basic-addon3">State</span>
                    <select formControlName="state" class="form-select" aria-label="Default select example">
                      <option *ngFor="let state of usaStates" [value]="state">{{state}}</option>

                    </select>
                  </div>
                  <div class="form-text" id="basic-addon4"><small
                    *ngIf="reactiveForm.get('state')!.touched && reactiveForm.get('state')!.hasError('required')"
                  >*state is required field</small></div>

                </div>


                <!--        city   input-group-->
                <div class="mb-3">
                  <div class="input-group">
                    <span class="input-group-text" id="basic-addon3">City</span>
                    <input formControlName="city" type="text" class="form-control" id="basic-url"
                           aria-describedby="basic-addon3 basic-addon4">
                  </div>
                  <div class="form-text" id="basic-addon4"><small
                    *ngIf="reactiveForm.get('city')!.touched && reactiveForm.get('city')!.hasError('required')"
                  >*city is required field</small></div>
                </div>

                <!--         zipCode   input-group-->
                <div class="mb-3">
                  <div class="input-group">
                    <span class="input-group-text" id="basic-addon3">ZIP Code</span>
                    <input formControlName="zipCode" type="text" class="form-control" id="basic-url"
                           aria-describedby="basic-addon3 basic-addon4">
                  </div>
                  <div class="form-text" id="basic-addon4"><small
                    *ngIf="reactiveForm.get('zipCode')!.touched && reactiveForm.get('zipCode')!.hasError('required')"
                  >*zipCode is required field</small></div>
                </div>

              </form>

            </div>



          </div>

          <div class="detail-wrap"  *ngIf="selectedMethod === 'Shipping'">
            <!--             -->
          </div>

          <div class="detail-wrap"  *ngIf="selectedMethod === 'Store Pickup'">
            <!--              -->
            <h3 class="m-3 text-main">Please select your pickup date</h3>
            <input class="ml-[1rem]" type="date">
          </div>

        </div>
        <div class="col-lg-6 direct-transaction-placeholder" >
        </div>
      </div>




    </div>

  `,
  styles:[
    `

        .box{
          width: 100%;
        }

        .cover{
          border: 1px solid black;
        }
        .cover:hover{
          border: 1px solid white;
          color: white;
          background-color: #375B50;
          cursor: pointer;
        }

        .selected{
          color: white;
          background-color: #375B50;
        }

        small{
          color: #cc181e;
        }

        #checkout-btn{
          display: block;
          width: 70%;
          color: white;
          background-color: #375B50;
          padding: 1rem 0;
          border-radius: 2rem;
          transition: color 0.5s ease-in-out, background-color 0.5s ease-in-out ,box-shadow 0.5s ease-in-out;
        }

        .paypal-wrap{
          margin: 0 auto;
          width: 70%;
          top: 1rem;
        }

        .hidden{
          display: none;
        }

        .payment-opened{
          display: none;
          /*background-color: white !important;*/
          /*border: 1px solid #375B50;*/
          /*color: #375B50 !important;*/
          /*box-shadow: 10px 10px 10px rgba(0, 0, 0, 0.2);*/
          /*font-weight: bold;*/

        }

        /*.direct-transaction-placeholder{*/
        /*  height: 80vh;*/
        /*}*/

    `
  ]
})
export class DeliverySelectComponent {

  constructor(private memberService:MemberService, private itemService: ItemService, private memberAuthService: MemberAuthService) {
  }

  selectedMethod = 'Shipping'

  address!: Address;

  address1!: string;

  reactiveForm!: FormGroup;

  checkoutReady:boolean = false;





  // 미국 주(State) 배열
  usaStates:string[] = [
    "Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado",
    "Connecticut", "Delaware", "Florida", "Georgia", "Hawaii", "Idaho",
    "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky", "Louisiana",
    "Maine", "Maryland", "Massachusetts", "Michigan", "Minnesota",
    "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada",
    "New Hampshire", "New Jersey", "New Mexico", "New York",
    "North Carolina", "North Dakota", "Ohio", "Oklahoma", "Oregon",
    "Pennsylvania", "Rhode Island", "South Carolina", "South Dakota",
    "Tennessee", "Texas", "Utah", "Vermont", "Virginia", "Washington",
    "West Virginia", "Wisconsin", "Wyoming"
  ];

  ngOnInit(){

    // address
    if(this.memberAuthService.getId()){
      this.memberService.getAddress(this.memberAuthService.getId()).subscribe((resp:any)=>{
        console.log(resp);
        this.address =resp;

        this.reactiveForm  = new FormGroup({
          address1:new FormControl(this.address?.address1, Validators.required),
          city: new FormControl(this.address?.city, Validators.required),
          state: new FormControl(this.address?.state, Validators.required),
          zipCode: new FormControl(this.address?.zipCode, Validators.required),
        });

      })
    }

  }

  onFormSubmit(){

  }


  methodChange(method:string){
    this.selectedMethod = method;
    console.log(this.selectedMethod);
  }

  chkoutBtnClick(){
    this.onFormSubmit();

    this.checkoutReady= !this.checkoutReady;
  }

}
