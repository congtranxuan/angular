import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { MenuInfo } from './menu-info';


@Injectable({
  providedIn: 'root'
})
export class MenuService {
  private url = "http://localhost/feastfreedomapi/menu/read.php?servicer_id=";
  private url1 = "http://localhost/feastfreedomapi/menu/delete.php?id=";
  private url2 = "http://localhost/feastfreedomapi/menu/create.php";
  private url3 = "http://localhost/feastfreedomapi/menu/update.php?id=";

  
  constructor(private Http:HttpClient) { }

  createmenu(data):Observable<MenuInfo>{
    return this.Http.post<MenuInfo>(this.url2,data)
    .pipe(catchError(this.errorHandler));
  }

  getmenu(id):Observable<MenuInfo>{
    return this.Http.get<MenuInfo>(this.url+id)
    .pipe(catchError(this.errorHandler));
  }
  deletemenu(id:number):Observable<void>{
    return this.Http.delete<void>(this.url1+id)
    .pipe(catchError(this.errorHandler));
  }
  updatemenu(id,data):Observable<void>{
    return this.Http.put<void>(this.url3+id,data,{
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
