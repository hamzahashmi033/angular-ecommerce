import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

import { login, Singup } from '../data-type';

@Injectable({
  providedIn: 'root'
})
export class SellerService {
  isSellerLoggedIn = new BehaviorSubject<boolean>(false)
  LoggedInError = new EventEmitter<boolean>(false)
  constructor(private http:HttpClient,private router:Router) { }
  sellerSignup(data:Singup){
   return this.http.post("http://localhost:3000/seller",data,{observe:"response"}).subscribe((result)=>{
    this.isSellerLoggedIn.next(true)
    localStorage.setItem("seller",JSON.stringify(result.body))
    this.router.navigate(["seller-home"])
   })
  }
  reloadSeller(){
    if(localStorage.getItem("seller")){
      this.isSellerLoggedIn.next(true)
      this.router.navigate(["seller-home"])
    }
  }
  sellerLogin(data:login){
    return this.http.get(`http://localhost:3000/seller?email=${data.email}&password=${data.password}`,{observe:"response"}).subscribe((result:any)=>{
      if(result && result.body && result.body.length){
        localStorage.setItem("seller",JSON.stringify(result.body))
        this.router.navigate(["seller-home"])
      }else{
        this.LoggedInError.emit(true)

      }
    })
  }
}
