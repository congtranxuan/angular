import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Ordertableinfo } from './ordertableinfo';

@Injectable({
  providedIn: 'root'
})
export class OrderserviceService {

   private url:string = "http://localhost/feastfreedomapi/order/create.php";
  
  constructor(private Http:HttpClient) { }

  register(orderinfo){
    return this.Http.post<any>(this.url, orderinfo)
    .pipe(catchError(this.errorHandler))
  }
  errorHandler(error: HttpErrorResponse) {
    return throwError(error.message || 'Server error')

}
}
