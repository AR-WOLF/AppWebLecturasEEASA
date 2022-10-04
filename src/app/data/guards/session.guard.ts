import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '@services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class SessionGuard implements CanActivate {

  constructor(private authService:AuthService, private router:Router) {

  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot):  boolean {
    if(this.authService.isLogin()==true){
      return true
    }else{
      sessionStorage.removeItem('token');
      this.router.navigate(['/login']); //redirigir a proyectos
      return false;
    }
  }
  
}
