import { Injectable } from '@angular/core';
import { Userregisterdata } from './userregisterdata';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserregistrationService {

  private url:string = "http://localhost/feastfreedomapi/user/create.php";
  
  constructor(private Http:HttpClient) { }

  register(userdata){
    return this.Http.post<any>(this.url, userdata)
    .pipe(catchError(this.errorHandler))
  }
  errorHandler(error: HttpErrorResponse) {
    return throwError(error.message || 'Server error')
}
}
