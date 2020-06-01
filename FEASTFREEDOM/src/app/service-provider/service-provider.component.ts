import { Component, OnInit } from '@angular/core';
import { MenuService } from '../regular-user/menu/menu.service';
import { MenuInfo } from "../regular-user/menu/menu-info";
import { ActivatedRoute, Router, ParamMap, NavigationEnd} from '@angular/router';



@Component({
  selector: 'app-service-provider',
  templateUrl: './service-provider.component.html',
  styleUrls: ['./service-provider.component.css']
})
export class ServiceProviderComponent implements OnInit {

  constructor( private loadmenu: MenuService, private deletemenu:MenuService, private route: ActivatedRoute, private router: Router) {
    this.routeEvent(this.router);  

  }
  routeEvent(router: Router){
    router.events.subscribe(e => {
      if(e instanceof NavigationEnd){
        console.log(e);

        this.route.paramMap.subscribe((params: ParamMap) => {
          this.id =params.get('id');
        });
    
        this.loadmenu.getmenu(this.id).subscribe(
          (data)=>{this.menu = data; console.log(this.menu)},
          (error)=>{this.errorMessage = error});

          this.accountinfo = JSON.parse(localStorage.getItem('servicer'));
      }
    });
  }
  public menu:MenuInfo;
  public errorMessage;
  public id;
  public accountinfo = JSON.parse(localStorage.getItem('servicer'));
 

  ngOnInit(): void {
    console.log(this.accountinfo);
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.id =params.get('id');
    });

    this.loadmenu.getmenu(this.id).subscribe(
      (data)=>{this.menu = data; console.log(this.menu)},
      (error)=>{this.errorMessage = error});

  }
  

  addmenu(){
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.id =params.get('id');});
      this.router.navigate(['/provider/',this.id,'addmenu']);

  }
  edit(item_id, name, veg, price, image){
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.id =params.get('id');});
      var editdata = {id:item_id, name:name, veg:veg, price:price, image:image};
      console.log(editdata);
      localStorage.setItem('edit_item',JSON.stringify(editdata));
      console.log(JSON.parse(localStorage.getItem('edit_item')));
      this.router.navigate(['/provider/',this.id,item_id]);
  }
  delete(id){
    console.log(id);
    this.deletemenu.deletemenu(id).subscribe(
      ()=>{console.log('Employee with ID = ${id} deleted');
        this.route.paramMap.subscribe((params: ParamMap) => {
        this.id =params.get('id');});
        console.log(this.id);

        
        this.loadmenu.getmenu(this.id).subscribe(
          (data)=>{this.menu = data; console.log(this.menu)},
          (error)=>{this.errorMessage = error});
    },
      (err)=>{this.errorMessage = err});
   }
   updateinfo(){
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.id =params.get('id');});
      this.router.navigate(['/provider/',this.id,'update']);
   }


}
