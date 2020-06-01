import { Component, OnInit } from '@angular/core';
import{ Providerregistercontform} from "../providerregistercontform";
import {  FileUploader } from 'ng2-file-upload';
import { Router } from '@angular/router';
import { ProviderregisterService } from "../providerregister.service";

const uploadAPI = 'http://localhost/feastfreedomapi/images/php-upload-file.php';

@Component({
  selector: 'app-provider-register-cont',
  templateUrl: './provider-register-cont.component.html',
  styleUrls: ['./provider-register-cont.component.css']
})

export class ProviderRegisterContComponent implements OnInit {
  
  constructor(private router:Router, private providerservice: ProviderregisterService) { }

  public times= [1,2,3,4,5,6,7,8,9,10,11,12];

  public userModel= new Providerregistercontform(0,0,0,0,0,0,0,7,7);

  public errorMessage;

  public uploader: FileUploader = new FileUploader({ url: uploadAPI, itemAlias: 'file' });

  ngOnInit(): void {
    this.uploader.onAfterAddingFile = (file) => { file.withCredentials = false; };
    this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
         console.log('FileUpload:uploaded successfully:', item, status, response, headers);
         console.log(JSON.parse(response).url);
         var imagelink = JSON.parse(response).url;
         var provider = JSON.parse(localStorage.getItem("providercredit"));
         console.log(imagelink);
         console.log(provider);
         console.log(this.userModel);
         var data = {name: provider.name,
                    email: provider.email,
                    password: provider.password,
                    onmon:this.userModel.onmon?1:0,
                    ontue:this.userModel.ontue?1:0,
                    onwed:this.userModel.onwed?1:0,
                    onthu:this.userModel.onthu?1:0,
                    onfri:this.userModel.onfri?1:0,
                    onsat:this.userModel.onsat?1:0,
                    onsun:this.userModel.onsun?1:0,
                    starttime:this.userModel.starttime,
                    endtime:this.userModel.endtime,
                    image:imagelink};
        console.log(data);
        
        this.providerservice.register(JSON.stringify(data))
        .subscribe(
          response => console.log('Success!', response), 
          error => this.errorMessage = error.statusText
        )
        alert("Your registration is successful, please login!");
        this.router.navigate(['provider/login']);
      }
        
    }

  }
  