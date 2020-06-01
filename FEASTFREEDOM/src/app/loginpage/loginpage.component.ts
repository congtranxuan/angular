import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { LoginserviceService } from "../loginservice.service";
import { Logindatatype} from "../logindatatype";
import { Router } from '@angular/router';


@Component({
  selector: 'app-loginpage',
  templateUrl: './loginpage.component.html',
  styleUrls: ['./loginpage.component.css']
})
export class LoginpageComponent implements OnInit {

  constructor(private fb: FormBuilder, private loginservice:LoginserviceService, private route: Router) { }
  public loginForm;
  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: [],
      password: []
    });
  }
  public logindata: Logindatatype;
  public errorMessage;
  public incorrectMessage;
  login(){
    var email = this.loginForm.value.email;
       
    this.loginservice.getpasswordbyemail(email).subscribe(
       (data) =>{
        this.logindata = data; 
        console.log(data);
        var password = this.logindata['password'];
        if(password===this.loginForm.value.password){
          //Save the user for globally access.
          localStorage.setItem('user',JSON.stringify(this.logindata));
          console.log(JSON.parse(localStorage.getItem('user')));
          alert("You are successfully logged in");
          this.route.navigate(['home']);
        } else{
          this.incorrectMessage = "Your email and password are not matched! Please try again"
          this.route.navigate(['login']);
         
        };
        },
       (error) => {this.errorMessage = error;
                    this.incorrectMessage = "Your email does not exist in the system!"});
      
  }
  register(){
    return this.route.navigate(['/register']);
  }

}
