import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import {  FileUploader } from 'ng2-file-upload';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { MenuInfo } from "../../regular-user/menu/menu-info";
import { MenuService } from "../../regular-user/menu/menu.service";

const uploadAPI = 'http://localhost/feastfreedomapi/images/php-upload-file.php';


@Component({
  selector: 'app-addmenu',
  templateUrl: './addmenu.component.html',
  styleUrls: ['./addmenu.component.css']
})
export class AddmenuComponent implements OnInit {

  constructor( private fb: FormBuilder, private route: ActivatedRoute, private router: Router, private addmenu: MenuService ) { }

  public uploader: FileUploader = new FileUploader({ url: uploadAPI, itemAlias: 'file' });

  public menuForm;
  public incorrectMessage;
  public errorMessage;
  //public menuinfo: MenuInfo;
  public id;
  ngOnInit(): void {
    this.menuForm = this.fb.group({
      name: [],
      veg: [],
      price: [],
      
    });

    this.uploader.onAfterAddingFile = (file) => { file.withCredentials = false; };
    this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
         console.log('FileUpload:uploaded successfully:', item, status, response, headers);
         var imagelink = JSON.parse(response).url;
         var provider = JSON.parse(localStorage.getItem("provider"));
         console.log(imagelink);
         console.log(provider);
         console.log(this.menuForm.value);
         console.log(this.menuForm.value.veg?1:0);
         var id = JSON.parse(localStorage.getItem('servicer')).id;
         console.log(id);
         var menuinfo = {servicer_id:id, name: this.menuForm.value.name,
                          veg:this.menuForm.value.veg?1:0, price:this.menuForm.value.price, image: imagelink};
          console.log(JSON.stringify(menuinfo));

         this.addmenu.createmenu(JSON.stringify(menuinfo))
         .subscribe(
           response => console.log('Success!', response), 
          error => this.errorMessage = error.statusText
         )
         alert("Your menu is added.");
         this.router.navigate(['/provider', id]);
      }
  }
  return(){

    var id = JSON.parse(localStorage.getItem('servicer')).id;
    console.log(id);
    this.router.navigate(['/provider', id]);

  }

}
