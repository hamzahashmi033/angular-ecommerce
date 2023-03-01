import { Component } from '@angular/core';
import { product } from '../data-type';
import { AddProductService } from '../services/add-product.service';
import { faTrash,faEdit } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-seller-home',
  templateUrl: './seller-home.component.html',
  styleUrls: ['./seller-home.component.css']
})
export class SellerHomeComponent {
  constructor(private productService:AddProductService){}
  productData : undefined | product[]
  icon = faTrash
  iconEdit = faEdit
  product : string | undefined
  ngOnInit(){
   this.productList()
  }
  productList(){
    this.productService.getAllProduct().subscribe((result)=>{
      this.productData = result
      // console.log(result[0].id)
    })
  }
  deleteProduct(id:number){
    this.productService.deleteProduct(id).subscribe((result)=>{
      if(result){
        this.product = "Product has been deleted"
        this.productList()
      }
    })
  }
}
