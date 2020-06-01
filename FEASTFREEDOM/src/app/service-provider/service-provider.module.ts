import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule }   from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { FileUploadModule } from 'ng2-file-upload';

import { ServiceProviderRoutingModule } from './service-provider-routing.module';
import { ServiceProviderComponent } from './service-provider.component';
import { ProviderRegisterComponent } from './provider-register/provider-register.component';
import { ProviderLoginComponent } from './provider-login/provider-login.component';
import { UpdateComponent } from './update/update.component';
import { UpdatemenuComponent } from './updatemenu/updatemenu.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AddmenuComponent } from './addmenu/addmenu.component';
import { ProviderRegisterContComponent } from './provider-register-cont/provider-register-cont.component';


@NgModule({
  declarations: [ServiceProviderComponent, ProviderRegisterComponent, ProviderLoginComponent, UpdateComponent, UpdatemenuComponent, AddmenuComponent, ProviderRegisterContComponent],
  imports: [
    CommonModule,
    ServiceProviderRoutingModule,
    FormsModule,
    HttpClientModule,
    FileUploadModule,
    ReactiveFormsModule,
  ]
})
export class ServiceProviderModule { }
