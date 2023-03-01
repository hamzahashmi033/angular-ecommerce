import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { order } from '../data-type';
import { AddProductService } from '../services/add-product.service';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent {
  orderData : order[] | undefined
  constructor(private product:AddProductService,private router:Router){}
  ngOnInit(){
    this.loadingOrder()
  }
  loadingOrder(){
    let userData = localStorage.getItem("users")
    let userId = userData && JSON.parse(userData).id
    this.product.getMyOrders(userId).subscribe((result)=> {
      this.orderData = result
    })
  }
  orderDetailsHandler(id:any){
    this.router.navigate(["order-detail",id])
  }
  cancelOrder(id:any){
    this.product.deleteOrder(id).subscribe((result)=>{
      if(result){
        this.loadingOrder()
      }
    })
  }
}
