import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/shared/api.service';
import { StorageService } from 'src/app/shared/storage.service';
import { UtilsService } from 'src/app/shared/utils.service';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  form: FormGroup;
  constructor(
    private utils: UtilsService,
    private formBuilder: FormBuilder,
    private api: ApiService,
    private storageService: StorageService,
    private router: Router
  ) {
    this.form = this.formBuilder.group({
      usuario:[environment.usuario, Validators.required],
      password :[environment.password, Validators.required],
    });
  }

  login() {
    // show spinner
    this.api.post('/auth/login', this.form.value).then((res:any)=> {
      // this.storageService.setItem('authData', res.data);
      this.storageService.setItem('authData', {
        nombre: res.data.nombre,
        corte: res.data.corte,
        tipo: res.data.tipo,
        token: res.token
      });
      if(res.data.corte.length != 0){
        setTimeout(() => {
          this.router.navigateByUrl('/home')
        },2500)
        this.utils.showToastSuccess('Acceso correcto', "Redirigiendo al punto de venta");
      }else{
        this.router.navigateByUrl('/auth/seleccionar-caja')
        this.utils.showToastSuccess('Acceso correcto', "Redirigiendo a seleccionar una caja");
      }

    }).catch((err)=> {
      console.log(err);
      this.utils.showToastWarning("Error!", "No ha sido posible acceder.");
    }).finally(()=> {
      // pcultar spinner
    })
  }
}
