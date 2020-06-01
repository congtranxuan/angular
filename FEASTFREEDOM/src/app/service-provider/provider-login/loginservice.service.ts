import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ServicerInfo } from '../../regular-user/servicer-info';


@Injectable({
  providedIn: 'root'
})
export class LoginserviceService {

 
  private url:string = "http://localhost/feastfreedomapi/servicer/read_onebyemail.php?email=";
 
  
  constructor(private Http:HttpClient) { }
  
  getservicerbyemail(email):Observable<ServicerInfo>{
    return this.Http.get<ServicerInfo>(this.url+email)
    .pipe(catchError(this.errorHandler));
  }

  errorHandler(error:HttpErrorResponse){
    return throwError(error.message||"Server Error");
  }
}
