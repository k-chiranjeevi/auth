import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthserviceService } from '../services/auth-service/authservice.service';

@Injectable({
  providedIn: 'root'
})
export class SigninGuard implements CanActivate {
  constructor(private service: AuthserviceService, private router: Router) { }
  canActivate(): boolean {
    if (this.service.isLogin()) {
      this.router.navigate(['/dashboard'])
      return false
    } else {
      return true
    }
  }
}
