import { Injectable} from '@angular/core';
import { Logindatatype } from './logindatatype';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class LoginserviceService {

  private url = 'http://localhost/feastfreedomapi/user/read_id.php?email=';

  public datalogin: Logindatatype;

  constructor(private Http: HttpClient) {}

  getpasswordbyemail(email) : Observable<Logindatatype>{
  return this.Http.get<Logindatatype>(this.url+email)
  .pipe(catchError(this.errorHandler));
  }

  errorHandler(error:HttpErrorResponse){
  return throwError(error.message||"Server Error");
  }

}
