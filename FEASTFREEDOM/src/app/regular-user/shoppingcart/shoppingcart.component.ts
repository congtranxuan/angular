import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { OrderserviceService } from '../orderservice.service';
import { Ordertableinfo } from '../ordertableinfo';
import { CommonService } from '../../common.service';


import { NgForm } from '@angular/forms';
import './../../../assets/smtp.js';


@Component({
  selector: 'app-shoppingcart',
  templateUrl: './shoppingcart.component.html',
  styleUrls: ['./shoppingcart.component.css']
})
export class ShoppingcartComponent implements OnInit {

  constructor ( private orderservice: OrderserviceService , private router: Router, private _sharedService: CommonService) { }

  public numberorder:any[]= JSON.parse(localStorage.getItem('ordernumber'));
  public numberid:any[]= JSON.parse(localStorage.getItem('orderid'));
  public Email : any;
  //goback to the last page with this servicer id
  public last_visited_id;
  public len; 
  
  ngOnInit(): void {
    this.last_visited_id = this.numberid[this.numberid.length-1].servicer_id;
  }
   
 retotal(){
  localStorage.setItem('ordernumber',JSON.stringify(this.numberorder));
  console.log(this.numberorder);
  console.log(this.numberid);
  console.log(this.len);
  this.len = this.numberid.length;
  this.numberorder = JSON.parse(localStorage.getItem('ordernumber'));
  var countitem=0;
  if(this.numberorder){
    var len = this.numberorder.length;
    console.log(len);
    for (var i=0; i<len; i++){
      countitem += this.numberorder[i];
    }
  }
  console.log(countitem);
  this._sharedService.emitChange(countitem);
  
  var valueout = 0;
  if(this.len>0){
    for (var i=0; i<this.len; i++){
      valueout += this.numberid[i].price*this.numberorder[i];
    }
  }
  console.log(valueout);
    return valueout;
    
  
 
    
  }

 public errorMessage;
 public orderdata : Ordertableinfo;
 public order:any[]=[];


 deleteitem(id){

  //find the index of item that would like to be deleted
  var indexitem = this.numberid.findIndex(ite => ite.id === id);

  //remove the item at that index
  this.numberid.splice(indexitem,1);
  this.numberorder.splice(indexitem,1);
  //reset the variable in the localstorage
  localStorage.setItem('ordernumber',JSON.stringify(this.numberorder));
  localStorage.setItem('orderid',JSON.stringify(this.numberid));
  
  this.retotal();
 }

 delete_cart(){
  localStorage.removeItem('ordernumber');
  localStorage.removeItem('orderid');
  this.numberid=null;
  this.numberorder=null;
  //reset len of array to be zero inorder to output retotal() equal 0;
  this.len = 0;
  this.router.navigate(['home']);

 }
 checkout(){
  //Get the customer id
  //var customer= localStorage.getItem("token");
  //var customer = {'id':2, 'name':'XUANCONG'};
  var customer = JSON.parse(localStorage.getItem('user'));
  var customer_id = customer.id;
  this.len = this.numberid.length;
 

  //Write the order into table in SQLserver
  for (var i=0; i<this.len; i++){
    this.orderdata ={'customer_id': customer_id, 'menu_id': this.numberid[i].id, "numbero":this.numberorder[i]};
    this.orderservice.register(JSON.stringify(this.orderdata))
    .subscribe(
      response=> console.log('Success!', response),
      error => this.errorMessage = error.statusText
    )
  }

  //Summarize the data for the order summary page
  this.order = [];
  for (var i=0; i<this.len; i++){
    this.order.push({"servicer_id":this.numberid[i].servicer_id,"name":this.numberid[i].name,
                  "price":this.numberid[i].price, "quantity":this.numberorder[i],
                  "total":this.numberid[i].price*this.numberorder[i]});
  }

  this.setWithExpiry('ordersummary',this.order,1*60*60*1000);
  this.setWithExpiry('ordertotal', this.retotal(), 1*60*60*1000);

  var getit = JSON.parse(localStorage.getItem('ordersummary')).value;
  console.log(getit);
  //clear the catch of cart
  localStorage.removeItem('ordernumber');
  localStorage.removeItem('orderid');
  // // localStorage.clear();

  //route out to the checking page.
  this.router.navigate(['home/checkout']);
 }

 
 continue_shopping(){
   //Reroute to the last page just visited
  //  var service_id = this.numberid[this.numberid.length-1].servicer_id;
  
   this.router.navigate(["home/", this.last_visited_id]);
 } 
 //set the localStorage with expire time
 setWithExpiry(key, value, ttl) {
  const now = new Date();
  const item = {
		value: value,
		expiry: now.getTime() + ttl
	}
	localStorage.setItem(key, JSON.stringify(item));
}

onSubmit() {

  this.Email.send({
  Host : 'smtp.elasticemail.com',
  Username : 'congtranxuan@gmail.com',
  Password : '2F20DA6D407FBD7E261CA56BCE965564BA56',
  To : 'congtranxuan@gmail.com',
  From : 'congtranxuan@gmail.com',
  Subject : 'Summary of order from Feastfreedom',
  Body : 'This is the test page!'
  }).then(message => {alert(message)});
    
  }

}
  

