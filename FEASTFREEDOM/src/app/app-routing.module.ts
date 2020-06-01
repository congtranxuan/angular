import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegularUserComponent} from "./regular-user/regular-user.component";
import { ServiceProviderComponent} from "./service-provider/service-provider.component";
import { LoginpageComponent } from './loginpage/loginpage.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { RegisterpageComponent } from './registerpage/registerpage.component';
import { LogoutComponent } from './logout/logout.component';
import { CanactivateGuard } from './canactivate.guard';
import { AuthorizationGuard } from "./authorization.guard";


// const routes: Routes = [
//   {path: '', redirectTo: '/home', pathMatch: 'full'},
//   {path: 'home', component:HomeComponent},
//   {path: "employee", component:EmployeeComponent},
//   {path: "employee/:id", component:EmployeedetailsComponent},
//   {path: '**',   component: PageNotFoundComponent} 

// ];
const routes: Routes = [
  {path: "", redirectTo:'/home', pathMatch: "full"},
  {path:"home", 
  loadChildren: () => import(`../app/regular-user/regular-user.module`).then(mod => mod.RegularUserModule)},
  {path: "provider", 
   loadChildren: () => import(`../app/service-provider/service-provider.module`).then(mod => mod.ServiceProviderModule)},
  {path: "login", component: LoginpageComponent}, 
  {path: "register", component: RegisterpageComponent},
  {path: "logout", component: LogoutComponent,
   canActivate: [CanactivateGuard]},
  {path: "**", component: PagenotfoundComponent}
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
