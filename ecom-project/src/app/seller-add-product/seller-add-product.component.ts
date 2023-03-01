import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { product } from '../data-type';
import { AddProductService } from '../services/add-product.service';

@Component({
  selector: 'app-seller-add-product',
  templateUrl: './seller-add-product.component.html',
  styleUrls: ['./seller-add-product.component.css']
})
export class SellerAddProductComponent {
  addProductMessage :string|undefined
  constructor(private addProductService:AddProductService){}
submit(data:product,addProduct:NgForm){
  this.addProductService.addProduct(data).subscribe((result)=>{
    if(result){
      this.addProductMessage = "Product added succesfully"
      setTimeout(()=>{
        this.addProductMessage = undefined
      },3000)
      addProduct.reset()
    }
  })

}
}
