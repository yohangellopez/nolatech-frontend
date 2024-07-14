import { Component } from '@angular/core';
import { UtilsService } from './shared/utils.service';
import { StorageService } from './shared/storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'pv-generales';
  constructor(
    private storageService: StorageService
  ) {
    this.storageService.getItem('authData').subscribe((res:any) => {
      // if(res?.)
    })
  }
}
