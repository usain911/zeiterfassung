import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Mitarbeiter } from '../shared/mitarbeiter';
import { throwError, Observable } from 'rxjs';
import { StundenService } from './stunden.service';
import { Route } from '@angular/compiler/src/core';
import { Router } from '@angular/router';
import { Login } from '../shared/login';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private api ="http://192.168.178.24/backend/decker";
  //private api ="https://jens-online.net/api";

  constructor(
    private http: HttpClient,
    private ss: StundenService,
    private router: Router
    ) { }

  public setNewPassword(login: Login):Observable<any> {
    return this.http.post<any>(`${this.api}/ma/setNewPw.php`, login);
  }

  public signIn(login: Login) {
    //console.log("sign in ");
    //console.log(login);
    //localStorage.setItem('ACCESS_TOKEN', "access_token");
    return this.http.post<any>(`${this.api}/ma/login.php`, login);
  }

  public isLoggedIn() {
    return localStorage.getItem('ACCESS_TOKEN') !==null;
  }

  public logout() {
    //console.log("logout");
    let str = window.btoa("rolle");
    localStorage.removeItem(str);
    localStorage.removeItem('ACCESS_TOKEN');
    localStorage.removeItem('auth');
    localStorage.removeItem('admin');
    localStorage.removeItem('rolle');
    this.router.navigate(['../login'])
  }

  getRole():string {
    let str = window.btoa('rolle');
    let rolle = localStorage.getItem(str);
    if(rolle) {
      return window.atob(rolle);
    }
    return 'fehler'
  }

  getId():string {
    let str = 'auth';
    let id = localStorage.getItem(str);
    if(id) {
      return id
    }
    return 'fehler'
  }

  public isAdmin():boolean {
    let str = window.btoa('rolle');
    if(localStorage.getItem(str) === window.btoa('1')) {
      return true
    }
    return false
  }
}
