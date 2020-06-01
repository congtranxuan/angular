import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { RegularUserRoutingModule } from './regular-user-routing.module';
import { RegularUserComponent } from './regular-user.component';
import { MenuComponent } from './menu/menu.component';

import { ShoppingcartComponent } from './shoppingcart/shoppingcart.component';
import { CheckoutComponent } from './checkout/checkout.component';


@NgModule({
  declarations: [RegularUserComponent, MenuComponent,  ShoppingcartComponent, CheckoutComponent],
  imports: [
    CommonModule,
    RegularUserRoutingModule, 
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class RegularUserModule { }
