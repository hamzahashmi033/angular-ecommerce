import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { product } from '../data-type';
import { AddProductService } from '../services/add-product.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  constructor(private router:Router,private product:AddProductService) { }
  menuType:string="default"
  sellerName : string = ''
  userName :string=''
  searchQuery : undefined | product[]
  cartItems = 0
  ngOnInit() {
    this.router.events.subscribe((val:any)=>{
      if(val.url){
        if(localStorage.getItem("seller")&& val.url.includes("seller")){
          this.menuType="seller"
          let seller = localStorage.getItem("seller")
          let selerData = seller && JSON.parse(seller)[0]
          this.sellerName = selerData.name
        }else if(localStorage.getItem("users")){
          let user = localStorage.getItem("users")
          let userData = user && JSON.parse(user)
          this.userName = userData.name
          this.menuType = "user"
          this.product.getCartList(userData.id)
        }
        else{
          this.menuType="default"
        }
      }
    })
    let cartData= localStorage.getItem('localCart');
    if(cartData){
      this.cartItems= JSON.parse(cartData).length
    }
    
      
     this.product.cartData.subscribe((result)=>{
      this.cartItems = result.length
     })

  }
  logout(){
    localStorage.removeItem("seller")
    this.router.navigate(["/"])
    this.product.cartData.emit([])
  }
  userLogout(){
    localStorage.removeItem("users")
    this.product.cartData.emit([])
    this.router.navigate(["/user-auth"])
  }
  search(query:KeyboardEvent){
    if(query){
      const element = query.target as HTMLInputElement

      this.product.searchProduct(element.value).subscribe((result)=>{
        if(result.length > 5){
          result.length = 5
        }
        this.searchQuery = result
      })
    }
  }
  hideSearch(){
    this.searchQuery = undefined
  }
  searchVal(val:string){
    this.router.navigate([`product/${val}`])
  }
  redirectToDetail(id:number){
    this.router.navigate(["/product-details/"+ id])
  }
}
