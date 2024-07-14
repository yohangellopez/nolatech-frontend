import { AuthInterceptor } from './interceptor/auth-interceptor';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  lang: string = 'en';
  constructor(
    public http: HttpClient
  ) {
  }

  get(url:string): Promise<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('authData')??'{}').token
      })
    };
    const promise = new Promise((resolve, reject) => {
      this.http.get(environment.api+url,httpOptions).subscribe(data => {
        resolve(data)
      },error=>{
        reject(error);
      });
    })
    return promise;
  }

  post(url:string, data:any) {
    const promise = new Promise((resolve, reject) => {
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type':  'application/json',
          'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('authData')??'{}').token
        })
      };
      this.http.post(environment.api+url, JSON.stringify(data), httpOptions).subscribe(data => {
        resolve(data)
      },error=>{
        reject(error);
      });
    })
    return promise;
  }
  
  put(url:string, data:any) {
    const promise = new Promise((resolve, reject) => {
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type':  'application/json',
          'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('authData')??'{}').token
        })
      };
      this.http.put(environment.api+url, JSON.stringify(data), httpOptions).subscribe(data => {
        resolve(data)
      },error=>{
        reject(error);
      });
    })
    return promise;
  }
 
  delete(url:string) {
    const promise = new Promise((resolve, reject) => {
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type':  'application/json',
          'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('authData')??'{}').token
        })
      };
      this.http.delete(environment.api+url, httpOptions).subscribe(data => {
        resolve(data)
      },error=>{
        reject(error);
      });
    })
    return promise;
  }

  getCustome(url:string): Promise<any> {
    const promise = new Promise((resolve, reject) => {
      this.http.get(url).subscribe(data => {
        resolve(data)
      },error=>{
        reject(error);
      });
    })
    return promise;
  }

  postCustome(url:string, data:any) {
    const promise = new Promise((resolve, reject) => {
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type':  'application/json'
        })
      };
      this.http.post(url, JSON.stringify(data), httpOptions).subscribe(data => {
        resolve(data)
      },error=>{
        reject(error);
      });
    })
    return promise;
  }
}
