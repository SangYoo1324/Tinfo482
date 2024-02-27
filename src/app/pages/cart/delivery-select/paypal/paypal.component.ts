import {Component, ElementRef, EventEmitter, Input, Output, ViewChild} from '@angular/core';

@Component({
  selector: 'app-paypal',
  standalone: true,
  imports: [],
  template: `
    <div class="payment-wrap" #paymentRef></div>
  `,
  styles: [
    `

    `
  ]
})
export class PaypalComponent {

  @Input('given_items') given_items:any =[{name: "ex1", price: 6, quantity: 2}, {name: "ex2", price: 6, quantity: 1}];

  @Input('isDelivery') isDelivery: boolean = true;




  @ViewChild('paymentRef', {static: true}) paypalRef!: ElementRef;



  ngOnInit(){



    //paypal
    console.log(window.paypal);

    window.paypal.Buttons(
      {
        style: {
          layout: 'vertical',
          shape: 'pill',
          label: 'paypal'
        },
        createOrder:(data:any, actions:any)=>{
          return actions.order.create(
            {
              purchase_units:[
                this.formingPaymentObject()
              ]


            }
          );
        },

        onApprove:(data:any, actions:any)=>{
          return actions.order.capture().then((details:any)=>{
            console.log(JSON.stringify(details,null,2));

            if(details.status === 'COMPLETED'){
              //move to receipt
              alert("Transaction successful.. moving to receipt page")
            }
          })
        },

        onError:(error:any)=>{
          console.log(error);
          alert("Something went wrong...");
        }
      }

    ).render(this.paypalRef.nativeElement);


    console.log(this.formingPaymentObject());
  }



  formingPaymentObject(){

    const shippingObj = {
      currency_code: 'USD',
      value: 5
    }

    let itemsArray:any[] = [];

    let totalAmount = 0;




   totalAmount =  this.given_items.reduce((sum:any, item:any)=>{
     // @ts-ignore
     itemsArray.push({
       name: item.name,
       description: 'test',
       unit_amount:{
         currency_code: 'USD',
         value: item.price
       },
       quantity: item.quantity,
       tax:{
         currency_code: 'USD',
         value: item.price *item.quantity * 0.1
       }
     })

     return sum + item.price* item.quantity
   },0);




    let finalPaymentObj = {
      amount : {
        value: totalAmount*1.1,
        currency_code: 'USD',
        breakdown:{
          item_total:{
            currency_code: "USD",
            value: totalAmount
          },
          tax_total:{
            currency_code: 'USD',
            value: totalAmount*0.1
          },
          //shipping
        },
        items: itemsArray
      }

    }

    // should be executed at the end
    if(this.isDelivery){
      // @ts-ignore
      finalPaymentObj.amount.breakdown['shipping'] = shippingObj

      // add to finalPaymentObj's totalAmount
      finalPaymentObj.amount.value = finalPaymentObj.amount.value + shippingObj.value;

    }

    console.log("totalAmount: "+totalAmount);
    console.log("finalPaymentObj.amount.value: "+ finalPaymentObj.amount.value);
    console.log(JSON.stringify(finalPaymentObj, null,2));
    return finalPaymentObj;
  }
}


// {
//   "amount": {
//   "value": "1540",
//     "currency_code": "USD",
//     "breakdown": {
//     "item_total": {
//       "currency_code": "USD",
//         "value": "1400"
//     },
//     "tax_total": {
//       "currency_code": "USD",
//         "value": "140"
//     }
//   }
// },
//   "items": [
//   {
//     "name": "Example-10",
//     "description": "test Description",
//     "unit_amount": {
//       "currency_code": "USD",
//       "value": 1400
//     },
//     "quantity": 1,
//     "tax": {
//       "currency_code": "USD",
//       "value": 140
//     }
//   }
// ]
// }
