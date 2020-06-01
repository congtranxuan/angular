import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CanactivateGuard implements CanActivate {
  constructor(private router:Router){}

  canActivate(): boolean{
    //next: ActivatedRouteSnapshot,
    //state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    var answer = confirm("Would you like to signout?");
    if(answer){

      localStorage.removeItem('servicer');
      localStorage.removeItem('user');

           
      return true;
    }else{
    
      return false;
    }
    
  }
  
}
