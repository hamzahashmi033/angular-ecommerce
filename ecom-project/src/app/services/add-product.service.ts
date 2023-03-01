import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { cart, order, product } from '../data-type';

@Injectable({
  providedIn: 'root'
})
export class AddProductService {
  cartData = new EventEmitter<product[] | []>()
  constructor(private http: HttpClient) { }

  addProduct(data:product){
    return this.http.post("http://localhost:3000/products",data)
  }
  getAllProduct(){
    return this.http.get<product[]>("http://localhost:3000/products")
  }
  deleteProduct(id:number){
    return this.http.delete<product[]>(`http://localhost:3000/products/${id}`)
  }
  getProduct(id:any){
    return this.http.get<product>(`http://localhost:3000/products/${id}`)
  }
  updateProduct(id:string , data:product){
    return this.http.put<product>(`http://localhost:3000/products/${id}`,data)
  }
  popularProduuct(){
    return this.http.get<product[]>("http://localhost:3000/products?_limit=3")
  }
  trendyProducts(){
    return this.http.get<product[]>("http://localhost:3000/products?_limit=8")
  }
  searchProduct(query:any){
    return this.http.get<product[]>(`http://localhost:3000/products?q=${query}`)
  }
  localAddtoCart(data:product){
    let cartData = []
    let localCart = localStorage.getItem("localCart")
    if(!localCart){
      localStorage.setItem("localCart",JSON.stringify([data]))
      this.cartData.emit([data])
    }else{
      cartData = JSON.parse(localCart)
      cartData.push(data)
      localStorage.setItem("localCart",JSON.stringify(cartData))
      this.cartData.emit(cartData)
    }
  }
  localRemoveToCart(productId:number){
    let cartData = localStorage.getItem("localCart")
    if(cartData){
      let items:product[] = JSON.parse(cartData)
      items = items.filter((items)=>{
        return  productId !== items.id
      })
      localStorage.setItem("localCart",JSON.stringify(items))
      this.cartData.emit(items)
    }
  }
  addToCart(data:cart){
    return this.http.post("http://localhost:3000/cart",data)
  }
  removeFromCart(cartProductId:number){
    return this.http.delete(`http://localhost:3000/cart/${cartProductId}`)
  }
  getCartList(userId : number){
    return this.http.get<product[]>(`http://localhost:3000/cart?userId=${userId}`,{observe:"response"}).subscribe((result)=>{
      if(result && result.body){
        this.cartData.emit(result.body)
        
         
      }
    })
  }
  cartItems(){
    let user = localStorage.getItem("users")
    let userData = user && JSON.parse(user)
    return this.http.get<cart[]>(`http://localhost:3000/cart?userId=${userData.id}`)
  }
  orderNow(data:order){
    return this.http.post("http://localhost:3000/orders",data)
  }
  getMyOrders(userId:number){
    return this.http.get<order[]>(`http://localhost:3000/orders?userId=${userId}`)
  }
  getOrderDetail(id:number){
    return this.http.get<order>(`http://localhost:3000/orders/${id}`)
  }
  deleteOrder(id:number){
    return this.http.delete(`http://localhost:3000/orders/${id}`)
  }
  deleteCartItems(cartProductId:number){
    return this.http.delete(`http://localhost:3000/cart/${cartProductId}`).subscribe((result)=>{
      if(result){
        this.cartData.emit([])
      }
    })
  }
}
