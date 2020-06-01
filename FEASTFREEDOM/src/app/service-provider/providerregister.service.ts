import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpClientModule } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ProviderregisterService {

  constructor(private Http: HttpClient) { }
  private url:string = "http://localhost/feastfreedomapi/servicer/create.php";

  register(userdata){
    return this.Http.post<any>(this.url, userdata)
    .pipe(catchError(this.errorHandler))
  }
  
  errorHandler(error: HttpErrorResponse) {
    return throwError(error.message || 'Server error')
}

}
