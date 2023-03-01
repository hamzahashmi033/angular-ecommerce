import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { order } from '../data-type';
import { AddProductService } from '../services/add-product.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent {
  totalPrice: number | undefined
  orderMsg: string | undefined = ""
  Productdata :any
  constructor(private product: AddProductService,private router:Router) { }
  ngOnInit() {
    let total = localStorage.getItem("totalPrice")
    let totalPrice = total && JSON.parse(total)
    this.totalPrice = totalPrice

    this.product.cartData.subscribe((result) => {
      this.Productdata = result
     
      
    })
  }
  orderSubmit(data: { email: string, address: string, contact: string }) {
    let userData = localStorage.getItem("users")
    let userId = userData && JSON.parse(userData).id
    if (this.totalPrice) {
      const orderDetails: order = {
        ...data,
        totalPrice: this.totalPrice,
        userId,
        newProductData : this.Productdata,
        id:undefined
      } 
      this.product.orderNow(orderDetails).subscribe((result)=>{
        if(result){
          this.orderMsg = "Order has been placed Successfully!"
          setTimeout(() => {
            this.router.navigate(["my-orders"])
          }, 2000);
        }
      })
    }
    this.Productdata.forEach((element: { id: number; }) => {
      setTimeout(() => {
        this.product.deleteCartItems(element.id)
      }, 2000);
    });
  }
}
