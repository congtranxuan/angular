import { Component, OnInit } from '@angular/core';
import { ServicerLoadService} from "../servicer-load.service";
import { Router } from "@angular/router";
import { ServicerName } from "../servicer-name";


@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  constructor(private loadservicename:ServicerLoadService){}
  
  public servicers:ServicerName;
  public errorMessage;
  public ordersummary:any[];
  public servicer_name:any[]=[];
  public ordertotal;
  public buyer;
  public orderdate;
  ngOnInit(): void {
    this.ordersummary = JSON.parse(localStorage.getItem('ordersummary')).value;
    this.ordertotal = JSON.parse(localStorage.getItem('ordertotal')).value;
    this.buyer = JSON.parse(localStorage.getItem('user'));
    var len = this.ordersummary.length;
    this.orderdate = new Date();
    console.log(this.orderdate);
    console.log(len);
    for (var i=0; i<len; i++){
      var id = this.ordersummary[i].servicer_id;
      this.loadservicename.getservicersbyid(id).subscribe(
      (data)=>{this.servicers = data;
        var name=this.servicers.name; 
        this.servicer_name.push(name);
      console.log(this.servicers);
      },
      (error)=>{this.errorMessage = error});
      
    }
    console.log(this.servicer_name);
    console.log(this.ordersummary);
    console.log(this.ordertotal);
    console.log(this.buyer.firstname)
  }

}
