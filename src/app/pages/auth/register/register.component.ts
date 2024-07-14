import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/shared/api.service';
import { StorageService } from 'src/app/shared/storage.service';
import { UtilsService } from 'src/app/shared/utils.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  form: FormGroup;
  constructor(
    private utils: UtilsService,
    private formBuilder: FormBuilder,
    private api: ApiService,
    private storageService: StorageService,
    private router: Router
  ) {
    this.form = this.formBuilder.group({
      username:['', Validators.required],
      name:['', Validators.required],
      lastname:['', Validators.required],
      email:['', Validators.required],
      password :['', Validators.required],
    });
  }

  register() {
    // show spinner
    this.api.post('/auth/register', this.form.value).then((res:any)=> {
      // this.storageService.setItem('authData', res.data);
      this.storageService.setItem('authData', {
        name: res.data.name,
        lastname: res.data.lastname,
        token: res.token
      });
      setTimeout(() => {
        this.router.navigateByUrl('/home')
      },2500)
      this.utils.showToastSuccess('Acceso correcto', "Redirigiendo al listado de Usuarios");
    }).catch((err)=> {
      let msg = err.error.message ? err.error.message : "No ha sido posible acceder.";
      this.utils.showToastWarning("Error!", msg);
    }).finally(()=> {
    })
  }

  navigateLogin() {
    this.router.navigate(['/auth/login']);
  }
}
