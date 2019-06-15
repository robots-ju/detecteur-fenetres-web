import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userIsAuthenticed = false;

  get userIsAuth() {
    console.log(this.userIsAuthenticed);
    return this.userIsAuthenticed;
  }

  constructor() { }

  login() {
    this.userIsAuthenticed = true;
  }

  logout() {
    this.userIsAuthenticed = false;
  }
}
