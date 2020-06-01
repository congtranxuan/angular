import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Userregisterdata } from '../userregisterdata';
import { UserregistrationService } from '../userregistration.service';


@Component({
  selector: 'app-registerpage',
  templateUrl: './registerpage.component.html',
  styleUrls: ['./registerpage.component.css']
})
export class RegisterpageComponent implements OnInit {

  constructor(private fb: FormBuilder, private registerservice: UserregistrationService , private route: Router) { }
   public registrationForm;
  ngOnInit(): void {
    this.registrationForm = this.fb.group({
      firstname: [],
      lastname: [],
      email: [],
      password: [],
      securequestion1: [],
      answer1:[],
      securequestion2:[],
      answer2:[],
      usertype:[]
    });
  }
  public errorMessage;
  registration(){
    //console.log(this.registrationForm);
    console.log(this.registrationForm.value);
    console.log(JSON.stringify(this.registrationForm.value));
    this.registerservice.register(JSON.stringify(this.registrationForm.value))
    .subscribe(
      response => console.log('Success!', response), 
      error => this.errorMessage = error.statusText
    )
    alert("Your registration is succesful, please login!");
    this.route.navigate(['login']);
  }

  returnlogin(){
    return this.route.navigate(['/login']);
  }
}
