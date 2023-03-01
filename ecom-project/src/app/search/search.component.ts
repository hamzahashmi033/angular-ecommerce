import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AddProductService } from '../services/add-product.service';
import { product } from '../data-type';
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {
  searchResult : undefined | product[];
  productMessage : undefined | string
  constructor(private router:ActivatedRoute, private productServie:AddProductService) {}
  ngOnInit(){
    const query =  this.router.snapshot.paramMap.get("name")
    this.productServie.searchProduct(query).subscribe((result)=>{
      if(result.length === 0){
        this.productMessage = "Product not found"  
      }else{
        this.searchResult = result
      }
    })
  }
  
}
