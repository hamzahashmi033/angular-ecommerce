import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { product } from '../data-type';
import { AddProductService } from '../services/add-product.service';

@Component({
  selector: 'app-seller-edit-product',
  templateUrl: './seller-edit-product.component.html',
  styleUrls: ['./seller-edit-product.component.css']
})
export class SellerEditProductComponent {
  productData:   undefined | product
  productMessage : string | undefined
  constructor(private route : ActivatedRoute,private product:AddProductService,private router:Router){}

  ngOnInit(){
    let productId =  this.route.snapshot.paramMap.get("id")
    productId && this.product.getProduct(productId).subscribe((result)=>{
      this.productData = result
    })
  }
  submit(data:product){
    let productId =  this.route.snapshot.paramMap.get("id")
    productId && this.product.updateProduct(productId,data).subscribe((result)=>{
      if(result){
        this.productMessage = "Product has been updated successfully"
        setTimeout(() => {
          this.productMessage = undefined
        }, 3000);
        this.router.navigate(["seller-home"])
      }
    })
  }
}
