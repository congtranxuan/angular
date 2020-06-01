import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProviderRegisterComponent } from "./provider-register/provider-register.component";
import { ProviderRegisterContComponent } from "./provider-register-cont/provider-register-cont.component";
import { ProviderLoginComponent } from "./provider-login/provider-login.component";
import { UpdateComponent } from "./update/update.component";
import { ServiceProviderComponent } from "./service-provider.component";
import { UpdatemenuComponent } from "./updatemenu/updatemenu.component";
import { AddmenuComponent } from "./addmenu/addmenu.component";
import { ServicerauthorizationGuard } from "../servicerauthorization.guard";


const routes: Routes = [
  {path: "", redirectTo:'login', pathMatch: "full"},
  {path: "register", component: ProviderRegisterComponent},
  {path: "registercont", component: ProviderRegisterContComponent},
  // canActivate: [ServicerauthorizationGuard]},
  {path: "login", component: ProviderLoginComponent},
  {path: "update", component: UpdateComponent,
  canActivate: [ServicerauthorizationGuard]},
  {path: ":id", component: ServiceProviderComponent, 
  canActivate: [ServicerauthorizationGuard],
  children: [
    { path: 'addmenu', component: AddmenuComponent,
    canActivate: [ServicerauthorizationGuard]},
    { path: "update", component: UpdateComponent,
    canActivate: [ServicerauthorizationGuard]},
    { path: ':id', component: UpdatemenuComponent,
    canActivate: [ServicerauthorizationGuard]},
    
  ]
},
  
 
    
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ServiceProviderRoutingModule { }
