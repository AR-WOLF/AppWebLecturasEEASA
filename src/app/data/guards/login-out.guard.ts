import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '@services/auth.service';


@Injectable({
  providedIn: 'root'
})
export class LoginOutGuard implements CanActivate {
  constructor(private authService:AuthService, private router:Router) {

  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot):boolean {
    
    if(this.authService.isLogin()==false){
      return true;
    }else{
      this.router.navigate(['lecturas']);  //redirigir a proyectos
      return false;
    }

  }
  
}
