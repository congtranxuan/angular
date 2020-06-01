import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import {  FileUploader } from 'ng2-file-upload';
import { ActivatedRoute, Router, ParamMap, NavigationEnd } from '@angular/router';
import { MenuInfo } from "../../regular-user/menu/menu-info";
import { MenuService } from "../../regular-user/menu/menu.service";

const uploadAPI = 'http://localhost/feastfreedomapi/images/php-upload-file.php';

@Component({
  selector: 'app-updatemenu',
  templateUrl: './updatemenu.component.html',
  styleUrls: ['./updatemenu.component.css']
})
export class UpdatemenuComponent implements OnInit {

  constructor( private fb: FormBuilder, private route: ActivatedRoute, private router: Router, private updatemenu: MenuService ) {
    this.routeEvent(this.router); 
   }
   routeEvent(router: Router){
    router.events.subscribe(e => {
      if(e instanceof NavigationEnd){
        console.log(e);

        this.defaultdata = JSON.parse(localStorage.getItem('edit_item'));
        this.menuForm = this.fb.group({
          name: [{ value: this.defaultdata.name, disabled: false }],
          veg: [{ value: this.defaultdata.veg, disabled: false }],
          price: [{ value: this.defaultdata.price, disabled: false }],
          
        });
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

  public menuForm;
  public incorrectMessage;
  public errorMessage;

  //public menuinfo: MenuInfo;

  public id;
  public defaultdata = JSON.parse(localStorage.getItem('edit_item'));
  ngOnInit(): void {
    
    this.menuForm = this.fb.group({
      name: [{ value: this.defaultdata.name, disabled: false }],
      veg: [{ value: this.defaultdata.veg, disabled: false }],
      price: [{ value: this.defaultdata.price, disabled: false }],
      
    });

    this.uploader.onAfterAddingFile = (file) => { file.withCredentials = false; console.log(file); };
    this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
         console.log('FileUpload:uploaded successfully:', item, status, response, headers);
         var imagelink = JSON.parse(response).url;
         var provider = JSON.parse(localStorage.getItem("provider"));
         console.log(imagelink);
         console.log(provider);
         console.log(this.menuForm.value)
         console.log(this.menuForm.value.veg?1:0);
         var id = JSON.parse(localStorage.getItem('servicer')).id;
         console.log(id);
         var menuinfo = {name: this.menuForm.value.name, veg:this.menuForm.value.veg?1:0, 
                         price:this.menuForm.value.price, image: imagelink};
          console.log(JSON.stringify(menuinfo));

         this.updatemenu.updatemenu(this.defaultdata.id,JSON.stringify(menuinfo))
         .subscribe(
           response => console.log('Success!', response), 
          error => this.errorMessage = error.statusText
         )
         alert("Your menu is updated.");
         this.router.navigate(['/provider', id]);
      }

  }
  cancel(){
    var id = JSON.parse(localStorage.getItem('servicer')).id;
    this.router.navigate(['/provider', id]);

  }


}
