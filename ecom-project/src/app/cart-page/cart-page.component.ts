import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { cart } from '../data-type';
import { AddProductService } from '../services/add-product.service';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.css']
})
export class CartPageComponent {
  cartData: cart[] | undefined
  price: number = 0
  tax: number = 0
  delivery: number = 0
  total: number = 0
  fullPrice: number = 0
  constructor(private product: AddProductService,private router:Router) { }
  ngOnInit() {  
   this.loadingitems()
  }
  loadingitems(){
    this.product.cartItems().subscribe((result) => {
      if (result) {
        this.cartData = result
        let mePrice= result.reduce((total, items) => (Number(items.price) * Number(items.quantity)) + total, 0)
        this.price = mePrice
        this.tax = this.price / 10
        this.delivery = 100
        this.total = this.price + this.tax + this.delivery
        localStorage.setItem("totalPrice",JSON.stringify(this.total))
        if(!this.cartData.length){
          this.router.navigate(['/'])
        }
      }
    })
    
  }
  removeFromCart(cartId:number|undefined){
    cartId && this.cartData && this.product.removeFromCart(cartId).subscribe((result)=>{
      if(result){
        this.loadingitems()
      }
    })
  }
  checkout(){
    this.router.navigate(["checkout"])
  }
}
