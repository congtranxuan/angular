import { Component, OnInit } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';
import { ActivatedRoute, Router, ParamMap, NavigationEnd } from '@angular/router';
import { UpdateService } from './update.service';
import { Updateform } from './updateform';


const uploadAPI = 'http://localhost/feastfreedomapi/images/php-upload-file.php';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {

  constructor(private route: ActivatedRoute, private router: Router , private updateservicer: UpdateService) {
    this.routeEvent(this.router); 
   }

  routeEvent(router: Router){
    router.events.subscribe(e => {
      if(e instanceof NavigationEnd){
        console.log(e);

        this.de = JSON.parse(localStorage.getItem('servicer'));
        // this.route.paramMap.subscribe((params: ParamMap) => {
        //   this.id =params.get('id');
        // });
    
        // this.loadmenu.getmenu(this.id).subscribe(
        //   (data)=>{this.menu = data; console.log(this.menu)},
        //   (error)=>{this.errorMessage = error});
      }
    });
  }

  public uploader: FileUploader = new FileUploader({ url: uploadAPI, itemAlias: 'file' });
  public de = JSON.parse(localStorage.getItem('servicer'));
  public userModel= new Updateform(this.de.name,
                                    this.de.onmon,
                                    this.de.ontue,
                                    this.de.onwed,
                                    this.de.onthu,
                                    this.de.onfri,
                                    this.de.onsat,
                                    this.de.onsun,
                                    this.de.starttime,
                                    this.de.endtime,
                                    this.de.image);

  public errorMessage;
  public times= [1,2,3,4,5,6,7,8,9,10,11,12];
  ngOnInit(): void {
    this.uploader.onAfterAddingFile = (file) => { file.withCredentials = false; };
    this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
        console.log('FileUpload:uploaded successfully:', item, status, response, headers);
        console.log(JSON.parse(response).url);
        var imagelink = JSON.parse(response).url;
        //var provider = JSON.parse(localStorage.getItem("providercredit"));
              
        var data = new  Updateform(this.userModel.name,
                                this.userModel.onmon?1:0,
                                this.userModel.ontue?1:0,
                                this.userModel.onwed?1:0,
                                this.userModel.onthu?1:0,
                                this.userModel.onfri?1:0,
                                this.userModel.onsat?1:0,
                                this.userModel.onsun?1:0,
                                this.userModel.starttime,
                                this.userModel.endtime,
                                imagelink);

        var newservicer = {id:this.de.id,
                          name:data.name,
                          email:this.de.email,
                          password:this.de.password,
                          onmon:data.onmon,
                          ontue:data.ontue,
                          onwed:data.onwed,
                          onthu:data.onthu,
                          onfri:data.onfri,
                          onsat:data.onsat,
                          onsun:data.onsun,
                          starttime:data.starttime,
                          endtime:data.endtime,
                          image:data.image};
        //save information for global access login
        localStorage.setItem('servicer',JSON.stringify(newservicer))                               
        this.updateservicer.updateservicerbyid(this.de.id,JSON.stringify(data))
        .subscribe(
           response => console.log('Success!', response), 
           error => this.errorMessage = error.statusText
         )

        alert("Your business information has been updated!");
        this.router.navigate(['/provider', this.de.id]);
      }
        
    }
    cancel(){
      this.router.navigate(['/provider', this.de.id]);
    }

  }


