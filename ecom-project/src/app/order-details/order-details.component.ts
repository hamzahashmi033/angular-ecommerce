import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { order, product } from '../data-type';
import { AddProductService } from '../services/add-product.service';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css']
})
export class OrderDetailsComponent {
  orderData:product[]|undefined
  constructor(private product:AddProductService,private activeRoutes:ActivatedRoute){}
  ngOnInit(){
    this.loadingOrder()
  }
  loadingOrder(){
    const stringOrderId = this.activeRoutes.snapshot.paramMap.get("orderId")
    let numberId = Number(stringOrderId)
    console.log(numberId);
    let userData = localStorage.getItem("users")
    let userId = userData && JSON.parse(userData).id
    this.product.getOrderDetail(numberId).subscribe((result)=> {
      this.orderData = result.newProductData
      console.log(this.orderData);
      
    })
  }
}
