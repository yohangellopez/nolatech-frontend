import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/shared/api.service';
import { StorageService } from 'src/app/shared/storage.service';
import { UserService } from 'src/app/shared/user.service';
import { UtilsService } from 'src/app/shared/utils.service';
declare var $: any; // Agrega esta línea

@Component({
  selector: 'app-editar-usuario',
  templateUrl: './editar-usuario.component.html',
  styleUrls: ['./editar-usuario.component.css']
})
export class EditarUsuarioComponent {
  form: FormGroup;
  selectedUser: any;

  constructor(private formBuilder: FormBuilder, private utils: UtilsService , private api: ApiService, private userService: UserService) {
    this.form = this.formBuilder.group({
      username: ['', Validators.required],
      name: ['', Validators.required],
      lastname: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.userService.currentUser.subscribe(user => {
      if (user) {
        this.selectedUser = user;
        this.form.patchValue({
          username: user.username,
          name: user.name,
          lastname: user.lastname,
          password: '' // No mostrar la contraseña actual
        });
      }
    });
  }

  update(): void {
    if (this.form.invalid) {
      return;
    }
    const updatedUser = this.form.value;
    this.api.put(`/api/v1/users/${this.selectedUser.id}`, updatedUser).then((res: any) => {
      this.utils.showToastSuccess('Exito', "Usuario actualizado correctamente");
      this.userService.triggerReload(); // Disparar evento de recarga
      // Ocultar el modal
      $('#editar-usuario').modal('hide');
    }).catch((err) => {
      console.log(err);
      this.utils.showToastWarning("Error!", "No ha sido posible actualizar los datos.");
    });
  }
}
