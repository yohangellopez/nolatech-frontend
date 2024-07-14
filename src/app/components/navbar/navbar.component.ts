import { Component } from '@angular/core';
import { StorageService } from 'src/app/shared/storage.service';
import { UtilsService } from 'src/app/shared/utils.service';
declare var $: any; // Agrega esta línea
declare var bootbox: any; // Agrega esta línea
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  nombreAutenticado:string = "";
  fecha:string = "";
   constructor(
    private utils: UtilsService,
    private storageService: StorageService,
   ) {
     // escucha los cambios y dispara el evento para actualizar la avriable
     this.storageService.getItem('authData').subscribe((res:any)=> {
        this.nombreAutenticado = res.name + ' ' + res.lastname;
      })
   }

  salir() {
    bootbox.confirm({
      title: 'Cerrar sesión',
      message: '¿Está seguro que desea salir?',
      buttons: {
        cancel: {
          label: '<i class="fa fa-times"></i> Cancelar'
        },
        confirm: {
          label: '<i class="fa fa-check"></i> Confirmar'
        }
      },
      callback: (result:any) => {
        if (result) {
          this.utils.clearStorage();
          window.location.href = '/login';
        }
      }
    });
  }
}
