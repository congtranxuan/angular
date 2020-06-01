import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginrequestedGuard implements CanActivate {
  canActivate():boolean{
    // next: ActivatedRouteSnapshot,
    // state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    var user = JSON.parse(localStorage.getItem('user'));
    console.log(user)
    if(user){
      return true;
    } else{
      alert("Please login to proceed to menu!");
      return false;
  }
}
}
