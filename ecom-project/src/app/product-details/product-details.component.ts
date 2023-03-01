import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { cart, product } from '../data-type';
import { AddProductService } from '../services/add-product.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent {
  productData: undefined | product
  productQuantity: number = 1
  removeCart: boolean = false
  removeCartId : product|undefined
  constructor(private activeRoute: ActivatedRoute, private product: AddProductService) { }
  ngOnInit() {
    const productId = this.activeRoute.snapshot.paramMap.get("productId")
    this.product.getProduct(productId).subscribe((result) => {
      this.productData = result
    })
    let cartItems = localStorage.getItem("localCart")
    if (productId && cartItems) {
      let items = JSON.parse(cartItems)
      items = items.filter((items: product) => {
        return productId === items.id.toString()
      })
      if (items.length) {
        
        this.removeCart = true
      } else {
        this.removeCart = false
      }
    }
    let userData = localStorage.getItem("users")
    if(userData){
      let userId = userData && JSON.parse(userData).id
      this.product.getCartList(userId)
      this.product.cartData.subscribe((result)=>{
        if(result){
          let item = result.filter((item:product)=>(productId?.toString()===item.productId?.toString()))
          if(item.length){
            this.removeCartId = item[0]
            this.removeCart = true
          }else{
            this.removeCart = false
          }
        }
      })
    }
  }
  handleQuantity(val: string) {
    if (this.productQuantity < 20 && val === "plus") {
      this.productQuantity += 1
    } else if (this.productQuantity > 1 && val === "minus") {
      this.productQuantity -= 1
    }
  }
  addToCart() {
    if (this.productData) {
      this.productData.quantity = this.productQuantity
      if (!localStorage.getItem("users")) {
        this.product.localAddtoCart(this.productData)
        this.removeCart = true
      }else{
        let userData = localStorage.getItem("users")
        let userId = userData && JSON.parse(userData).id
        let cartData:cart = {
          ...this.productData,
          userId,
          productId:this.productData.id
        }
        delete cartData.id
        this.product.addToCart(cartData).subscribe((result)=>{
        if(result){
            this.product.getCartList(userId)
            this.removeCart=true
        }
        })
        
      }
    }
  }
  removeToCart(id:number){
    if(!localStorage.getItem("users")){
      this.product.localRemoveToCart(id)
      this.removeCart=false
    }else{
      let userData = localStorage.getItem("users")
      let userId = userData && JSON.parse(userData).id
      if(this.removeCartId){
        this.product.removeFromCart(this.removeCartId.id).subscribe((result)=>{
          if(result){
            this.product.getCartList(userId)
          }
        })
      }
    }
  }
}
