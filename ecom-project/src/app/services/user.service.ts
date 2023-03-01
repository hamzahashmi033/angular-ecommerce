import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { cart, login, product, Singup } from '../data-type';
import { AddProductService } from './add-product.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  invalidUser = new EventEmitter<boolean>(false)
  constructor(private http: HttpClient, private router: Router, private product: AddProductService) { }

  signUp(data: Singup) {
    this.http.post("http://localhost:3000/users", data, { observe: "response" }).subscribe((result) => {
      if (result) {
        localStorage.setItem("users", JSON.stringify(result.body))
        this.router.navigate(["/"])
      }
    })
  }
  login(data: login) {
    this.http.get<Singup[]>(`http://localhost:3000/users?email=${data.email}&password=${data.password}`, { observe: "response" }).subscribe((result) => {
      if (result && result.body?.length) {
        localStorage.setItem("users", JSON.stringify(result.body[0]))
        this.router.navigate(["/"])
        this.invalidUser.emit(false)
      } else {
        this.invalidUser.emit(true)
      }
    })
  }
  userAuthReload() {
    if (localStorage.getItem("users")) {
      this.router.navigate(["/"])
    }
  }
  
}
