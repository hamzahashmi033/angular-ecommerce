import { Component } from '@angular/core';
import { login, Singup } from '../data-type';
import { SellerService } from '../services/seller.service';

@Component({
  selector: 'app-seller-auth',
  templateUrl: './seller-auth.component.html',
  styleUrls: ['./seller-auth.component.css']
})
export class SellerAuthComponent {
  constructor(private seller:SellerService){ }
  showLogin :boolean = true
  errorMessage:string = ""
  ngOnInit():void{
    this.seller.reloadSeller()
  }
  signUp(data:Singup):void{
    this.seller.sellerSignup(data)
  }
  login(data:login){
    this.errorMessage=""
    // console.log(data)
    this.seller.sellerLogin(data)
    this.seller.LoggedInError.subscribe((error)=>{
      if(error){
        this.errorMessage="Credentials are not valid"
      }
    })
  }
  openLogin(){
    this.showLogin = true
  }
  openSignup(){
    this.showLogin =false
  }

}
