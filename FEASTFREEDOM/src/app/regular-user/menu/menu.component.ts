import { Component, OnInit } from '@angular/core';
import { MenuInfo } from "./menu-info";
import { MenuService }  from './menu.service';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  constructor(private fb: FormBuilder, private loadmenu: MenuService, private route: ActivatedRoute, private router: Router) { }
  public menu:MenuInfo;
  public errorMessage;
  public id;
 
  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.id =params.get('id');
    });

    this.loadmenu.getmenu(this.id).subscribe(
      (data)=>{this.menu = data},
      (error)=>{this.errorMessage = error});

    this.inputForm = this.fb.group({
      numbero: [{ value: 1, disabled: false }],
      });  
 
  }
  
  public inputForm;
  public numberorder:any[]= new Array();
  public numberid:any[]= new Array();
   
  addtocart(item){
    console.log(this.inputForm.value.numbero);
    this.numberorder=[];
    this.numberid=[];
    if(localStorage.getItem("orderid")===null){
        //get the form of array desclared
        this.numberorder.push(this.inputForm.value.numbero);
        this.numberid.push(item);
        //set the value for localStorage
        localStorage.setItem("ordernumber",JSON.stringify(this.numberorder));
        localStorage.setItem('orderid',JSON.stringify(this.numberid));
    }else{
        //if there is existing variables in localStorate, read out and push next to them.
        this.numberid =JSON.parse(localStorage.getItem('orderid'));
        this.numberorder = JSON.parse(localStorage.getItem('ordernumber'));

        //Check whether the current array exisiting in the localStorage, if existing, increase the number of order
        var indexitem = this.numberid.findIndex(ite => ite.id === item.id);
      if (indexitem != -1){
          this.numberorder[indexitem]+=this.inputForm.value.numbero;
          localStorage.setItem('ordernumber',JSON.stringify(this.numberorder));
       }else{
         //if there is not existing, push next to them.
          this.numberid.push(item);
          this.numberorder.push(this.inputForm.value.numbero);
          localStorage.setItem('ordernumber',JSON.stringify(this.numberorder));
          localStorage.setItem('orderid',JSON.stringify(this.numberid));

       }
       
    }
    this.router.navigate(['home/shoppingcart']);
    
  }

  
}

