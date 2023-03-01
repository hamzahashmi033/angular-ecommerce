import { Component } from '@angular/core';
import { cart, login, product, Singup } from '../data-type';
import { AddProductService } from '../services/add-product.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-user-auth',
  templateUrl: './user-auth.component.html',
  styleUrls: ['./user-auth.component.css']
})
export class UserAuthComponent {
  constructor(private userService: UserService, private product: AddProductService) { }
  loginForm: boolean = true
  authError: string = ""
  ngOnInit() {
    this.userService.userAuthReload()
  }
  signUp(val: Singup) {
    this.userService.signUp(val)
  }
  login(data: login) {
    this.userService.login(data)
    this.userService.invalidUser.subscribe((result) => {
      if (result) {
        this.authError = "Please enter valid credentials!"
      } else {
        this.localCartToRemoteCart()
      }
    })
  }
  openForm() {
    this.loginForm = !this.loginForm

  }
  localCartToRemoteCart(){
    let data = localStorage.getItem('localCart');
    let user = localStorage.getItem('users');
    let userId=  user && JSON.parse(user).id;
    if(data){
     let cartDataList:product[]= JSON.parse(data);
   
     cartDataList.forEach((product:product, index)=>{
       let cartData:cart={
         ...product,
         productId:product.id,
         userId
       }
       delete cartData.id;
       setTimeout(() => {
         this.product.addToCart(cartData).subscribe((result)=>{
           if(result){
             console.warn("data is stored in DB");
           }
         })
       }, 500);
       if(cartDataList.length===index+1){
         localStorage.removeItem('localCart')
       }
     })
    }
    setTimeout(()=>{
      this.product.getCartList(userId)
    },2000)    
   }
}
