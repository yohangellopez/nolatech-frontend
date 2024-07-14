import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ApiService } from 'src/app/shared/api.service';
import { StorageService } from 'src/app/shared/storage.service';
import { UserService } from 'src/app/shared/user.service';
import { UtilsService } from 'src/app/shared/utils.service';
declare var $: any; // Agrega esta línea
declare var bootbox: any; // Agrega esta línea

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent{
  @ViewChild('editarUsuario') editarUsuario: any; // Acceso al input

  search= "";
  usuarios: any[] = [];
  page = 1;
  count = 10;
  totalPages = 0;
  
  constructor(
    private storageService: StorageService,
    private api: ApiService,
    private formBuilder: FormBuilder,
    private utils: UtilsService,
    private userService: UserService
  ) {
    
  }

  ngOnInit(): void {
    this.getUsuarios(this.page);
    this.userService.reloadUsers.subscribe(reload => {
      if (reload) {
        this.getUsuarios(this.page);
      }
    });
  }

  getUsuarios(page: number): void {
    this.api.get(`/api/v1/users?page=${page}&count=${this.count}`).then((res: any) => {
      this.usuarios = res.data;
      this.totalPages = res.meta.totalPages;
    }).catch((err) => {
      console.log(err);
    });
  }

  editarUser(user: any){
    this.userService.changeUser(user);
  }
  
  eliminarUsuario(event: Event, id: Number) {
    event.preventDefault();
    bootbox.confirm({
      title: "¿Estás seguro?",
      message: "¿Estás seguro que deseas eliminar el usuario?",
      buttons: {
        cancel: {
          label: '<i class="fa fa-times"></i> Cancelar'
        },
        confirm: {
          label: '<i class="fa fa-check"></i> Confirmar'
        }
      },
      callback: (result: boolean) => {
        if(result) {
          this.api.delete(`/api/v1/users/${id}`).then((res: any) => {
            this.getUsuarios(this.page);
          }).catch((err) => {
            console.log(err);
          });
        }
      }
    });
  }

  prevPage(): void {
    if (this.page > 1) {
      this.page--;
      this.getUsuarios(this.page);
    }
  }

  nextPage(): void {
    if (this.page < this.totalPages) {
      this.page++;
      this.getUsuarios(this.page);
    }
  }
}
