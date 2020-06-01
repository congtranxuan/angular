import { Injectable } from '@angular/core';
import { ServicerInfo } from './servicer-info';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ServicerLoadService {

  private url:string = "http://localhost/feastfreedomapi/servicer/read.php";
  private url1:string = "http://localhost/feastfreedomapi/servicer/read_one.php?id=";
  
  constructor(private Http:HttpClient) { }
  getservicers():Observable<ServicerInfo>{
    return this.Http.get<ServicerInfo>(this.url)
    .pipe(catchError(this.errorHandler));
  }
  getservicersbyid(id):Observable<ServicerInfo>{
    return this.Http.get<ServicerInfo>(this.url1+id)
    .pipe(catchError(this.errorHandler));
  }

  errorHandler(error:HttpErrorResponse){
    return throwError(error.message||"Server Error");
  }
}
