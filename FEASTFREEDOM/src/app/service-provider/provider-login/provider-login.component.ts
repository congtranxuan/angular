import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginserviceService } from './loginservice.service';
import { ServicerInfo } from '../../regular-user/servicer-info';

@Component({
  selector: 'app-provider-login',
  templateUrl: './provider-login.component.html',
  styleUrls: ['./provider-login.component.css']
})
export class ProviderLoginComponent implements OnInit {

  constructor(private fb: FormBuilder, private loginservice:LoginserviceService, private route: Router) { }
  
  public loginForm;

  public errorMessage;
  public incorrectMessage;
  public servicerdata: ServicerInfo;

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: [],
      password: []
    });
  }
  login(){
    var email = this.loginForm.value.email;
    console.log(this.loginForm.value.password);

    this.loginservice.getservicerbyemail(email).subscribe(
       (data) =>{
        this.servicerdata = data; 

        console.log(this.servicerdata);

        var password = this.servicerdata['password'];

        if(password===this.loginForm.value.password){
          localStorage.setItem('servicer',JSON.stringify(this.servicerdata));
          
          alert("You are successfully logged in");
          console.log(this.servicerdata['id']);
          this.route.navigate(['provider', this.servicerdata['id']]);

        } else{
          this.incorrectMessage = "Your email and password are not matched! Please try again"
          
         
        };
        },
       (error) => {this.errorMessage = error;
                    this.incorrectMessage = "Your email does not exist in the system!"});
      
  }
  register(){
    return this.route.navigate(['/provider/register']);
  }
}





  
  
  
 

