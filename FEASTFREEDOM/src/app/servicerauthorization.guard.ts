import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServicerauthorizationGuard implements CanActivate {
  canActivate():boolean{
    // next: ActivatedRouteSnapshot,
    // state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    var servicer = JSON.parse(localStorage.getItem('servicer'));
    console.log(servicer);
    if(servicer){
      return true;
    } else{
      return false;
    }
}
}
