import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import jwtDecode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private router:Router) { }


  public setToken(_token:string){ 
    localStorage.setItem('jwt_token',_token);
  }


  public getToeken():any{ 
    try {
      let _localToken:string|null = sessionStorage.getItem('token');
      if(_localToken == null || _localToken == '' || _localToken == undefined){
        return {};
      }else{
        let _jwtDecode = jwtDecode(_localToken);
        return _jwtDecode;
      }
    } catch (error) {
      return {};
    }
  }


  public isLogin():boolean{
    try {
      let _jwtDecode = this.getToeken();
      if(_jwtDecode == {}){
        return false;
      }else{
        if(!_jwtDecode.iss || !_jwtDecode == null || !_jwtDecode ){
          return false;
        }else{
          return true;
        }
      }
    } catch (error) {
      return false;
    }
  }


  public logOut(){
    sessionStorage.removeItem('token');
    //cerrar modales
    this.router.navigate(['/login'])
  }



}
