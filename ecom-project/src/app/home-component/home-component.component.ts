import { Component  } from '@angular/core';
import { NgbCarouselConfig, NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';
import { NgIf } from '@angular/common';
import { AddProductService } from '../services/add-product.service';
import { product } from '../data-type';

@Component({
  selector: 'app-home-component',
  templateUrl: './home-component.component.html',
  styleUrls: ['./home-component.component.css']
})
export class HomeComponentComponent {
  images = [700, 533, 807, 124].map((n) => `https://picsum.photos/id/${n}/900/500`);
  productData : undefined | product[]
  trendyProduct : undefined | product[]
  constructor(config: NgbCarouselConfig,private popularProduct:AddProductService) {
		// customize default values of carousels used by this component tree
		config.interval = 3000;
		config.wrap = true;
		config.keyboard = false;
		config.pauseOnHover = false;
    
	}
  ngOnInit(){
    this.popularProduct.popularProduuct().subscribe((data)=>{
      this.productData=data
    })
    this.popularProduct.trendyProducts().subscribe((data)=>{
      this.trendyProduct = data
    })
  }
}
