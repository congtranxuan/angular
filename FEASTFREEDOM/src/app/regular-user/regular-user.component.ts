import { Component, OnInit } from '@angular/core';
import { ServicerLoadService } from './servicer-load.service';
import { ServicerInfo } from './servicer-info';
import { Router } from "@angular/router";


@Component({
  selector: 'app-regular-user',
  templateUrl: './regular-user.component.html',
  styleUrls: ['./regular-user.component.css']
})
export class RegularUserComponent implements OnInit {

  constructor(private load:ServicerLoadService,  private router:Router) { }
  public servicers:ServicerInfo;
  public errorMessage;
  ngOnInit(): void {
    
    this.load.getservicers().subscribe(
      (data)=>{this.servicers = data;
      console.log(this.servicers);
      },
      (error)=>{this.errorMessage = error});
  }
  gomenu(service){
    //this.route.navigate([service.id], { relativeTo: this.route });
    this.router.navigate(['/home/', service.id]);
  }

  }
    