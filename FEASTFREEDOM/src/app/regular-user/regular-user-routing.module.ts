import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegularUserComponent} from './regular-user.component';
import { MenuComponent } from './menu/menu.component';

import { ShoppingcartComponent } from './shoppingcart/shoppingcart.component';
import { CheckoutComponent } from "./checkout/checkout.component";

import { LoginrequestedGuard } from '../loginrequested.guard';
import { AuthorizationGuard } from "../authorization.guard";
const routes: Routes = [
  {path: "", component: RegularUserComponent},
  {path: "shoppingcart", component: ShoppingcartComponent,
  canActivate: [AuthorizationGuard]},
  {path: "checkout", component: CheckoutComponent,
  canActivate: [AuthorizationGuard]},
  {path: ":id", component: MenuComponent,
  canActivate: [LoginrequestedGuard]},
    
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RegularUserRoutingModule { }
