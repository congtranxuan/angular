import { Component } from '@angular/core';
import { ActivatedRoute, Router, ParamMap, NavigationEnd} from '@angular/router';
import { CommonService } from './common.service';




@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'FEASTFREEDOM';
  constructor( private router: Router, private _sharedService:CommonService){
    this.routeEvent(this.router); 

    _sharedService.changeEmitted$.subscribe(
      text => {
          this.countitem = text;
          console.log(this.countitem);
      });
    
  }
  public servicer = JSON.parse(localStorage.getItem('service'));
  public user = JSON.parse(localStorage.getItem('user'));
  // public numberid:any[]= JSON.parse(localStorage.getItem('orderid'));
  // public len = this.numberid.length;
  public countitem:any =0;
 
  routeEvent(router: Router){
    router.events.subscribe(e => {
      if(e instanceof NavigationEnd){
        console.log(e);
        this.servicer = JSON.parse(localStorage.getItem('servicer'));
        this.user = JSON.parse(localStorage.getItem('user'));
        console.log(this.user);

        var numberorder = JSON.parse(localStorage.getItem('ordernumber'));
        console.log(numberorder);
        this.countitem=0;
        if(numberorder){
          var len = numberorder.length;
          console.log(len);
          for (var i=0; i<len; i++){
            console.log(this.countitem);
            this.countitem = this.countitem + numberorder[i];
            console.log(numberorder[1]);
            
          }
        console.log(this.countitem);
        }   
      }
    });
  }
  ngOnDestroy(){
    var numberorder = JSON.parse(localStorage.getItem('ordernumber'));
        console.log(numberorder);
        if(numberorder){
          var len = numberorder.length;
          console.log(len);
          for (var i=0; i<len; i++){
            console.log(this.countitem);
            this.countitem = this.countitem + numberorder[i];
            console.log(numberorder[1]);
            
          }
        }else{
          this.countitem=0;
          
        
        }
        console.log(this.countitem);
        
  }
  logout(){
    
    // localStorage.removeItem('servicer');
    // localStorage.removeItem('user');
    // localStorage.clear();
    this.router.navigate(['logout']);

  }
}
