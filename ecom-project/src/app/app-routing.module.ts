import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartPageComponent } from './cart-page/cart-page.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { HomeComponentComponent } from './home-component/home-component.component';
import { MyOrdersComponent } from './my-orders/my-orders.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { OrderDetailsComponent } from './order-details/order-details.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { SearchComponent } from './search/search.component';
import { SellerAddProductComponent } from './seller-add-product/seller-add-product.component';
import { SellerAuthGuard } from './seller-auth.guard';
import { SellerAuthComponent } from './seller-auth/seller-auth.component';
import { SellerEditProductComponent } from './seller-edit-product/seller-edit-product.component';
import { SellerHomeComponent } from './seller-home/seller-home.component';
import { UserAuthComponent } from './user-auth/user-auth.component';

const routes: Routes = [{
  path:"",
  component:HomeComponentComponent
},
{
  path:"seller-auth",
  component:SellerAuthComponent
},
{
  path:"seller-home",
  component:SellerHomeComponent ,canActivate:[SellerAuthGuard]
},
{
  path:"seller-add-product",
  component:SellerAddProductComponent ,canActivate:[SellerAuthGuard]
},
{
  path:"seller-update-product/:id",
  component:SellerEditProductComponent ,canActivate:[SellerAuthGuard]
},
{
  path:"product/:name",
  component:SearchComponent
},
{
  path:"product-details/:productId",
  component:ProductDetailsComponent
},
{
  path:"user-auth",
  component:UserAuthComponent
},{
  path:"cart-page",
  component:CartPageComponent
},{
  path:"checkout",
  component:CheckoutComponent
},
{
path:"my-orders",
component:MyOrdersComponent
},{
path:"order-detail/:orderId",
component:OrderDetailsComponent
},
{
  path:"**",
  component:NotFoundComponent
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
