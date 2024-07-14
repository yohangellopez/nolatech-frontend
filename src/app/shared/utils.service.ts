import { Router } from '@angular/router';
import { ApiService } from './api.service';
import { StorageService } from './storage.service';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

declare var bootbox:any;
@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor(
    private toastr: ToastrService,
    private storageService: StorageService,
    private api: ApiService,
    private router: Router
  ) { }

  showToastSuccess(title:string,message:string) {this.toastr.success(message,title);}
  showToastError(title:string,message:string) {this.toastr.error(message,title);}
  showToastWarning(title:string,message:string) {this.toastr.warning(message,title);}
  showToastInfo(title:string,message:string) {this.toastr.info(message,title);}

  clearStorage() {
    localStorage.clear();
  }

  confirmDialog(title:string,message:string): Promise<any> {
    let promise = new Promise((resolve, reject) => {
      bootbox.alert({
        title: title,
        message: message,
        size: 'large',
        buttons: {
          ok: {
            label: 'Aceptar',
            className: 'btn-success'
          }
        },
        callback: function (result:any) {
          resolve(result);
        }
      });
    });
    return promise;
  }

  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('authData')??'{}');
    return (user?.id !== null && user?.name != undefined) ? true : false;
  }
}
