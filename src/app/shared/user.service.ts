import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userSource = new BehaviorSubject<any>(null);
  currentUser = this.userSource.asObservable();

  private reloadSource = new BehaviorSubject<boolean>(false);
  reloadUsers = this.reloadSource.asObservable();

  constructor() { }

  changeUser(user: any) {
    this.userSource.next(user);
  }

  triggerReload() {
    this.reloadSource.next(true);
  }
}
