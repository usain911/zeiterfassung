import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CanNavigateToLoginGuard implements CanActivate {
  canActivate(): boolean {
    if(localStorage.getItem('auth')) {
      return true
    }
    console.log("nicht angemeldet");
    return false;
  }

}
