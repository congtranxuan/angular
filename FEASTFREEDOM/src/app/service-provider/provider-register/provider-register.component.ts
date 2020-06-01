import { Component, OnInit } from '@angular/core';
import {Providerregisterform} from '../providerregisterform';
import { Router } from '@angular/router';

@Component({
  selector: 'app-provider-register',
  templateUrl: './provider-register.component.html',
  styleUrls: ['./provider-register.component.css']
})
export class ProviderRegisterComponent implements OnInit {
  
  constructor(private router:Router) { }
  public errorMsg;

  public userModel = new Providerregisterform("", "", "", "");

  ngOnInit(): void {
  }

  register(){
    console.log(this.userModel);
    var providerinfo = JSON.stringify({name: this.userModel.name,
                        email: this.userModel.email,
                        password: this.userModel.password
                      });
    localStorage.setItem("providercredit", providerinfo);
    console.log(localStorage.getItem("providercredit"));
    this.router.navigate(['provider/registercont']);


  }
  cancel(){
    this.router.navigate(['/home']);
  }
  login(){
    this.router.navigate(['/provider/login']);
  }
}
