import { Injectable } from '@angular/core';

import { HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UpdateService {

  constructor(private Http:HttpClient) { }
  private url:string = "http://localhost/feastfreedomapi/servicer/update.php?id=";

  updateservicerbyid(id,data):Observable<void>{
    return this.Http.put<void>(this.url+id,data,{
      headers:new HttpHeaders({
        'Content-Type': 'application/json'
      })
    })
    .pipe(catchError(this.errorHandler));
  }
 
  errorHandler(error:HttpErrorResponse){
    return throwError(error.message||"Server Error");
  }

}
