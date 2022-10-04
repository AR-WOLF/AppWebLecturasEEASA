import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';
import axios from 'axios';

import { AuthService } from "@services/auth.service";
import { Router } from '@angular/router';
import { appInjector } from "@constants/injector";

//Request
axios.interceptors.request.use(function (config:any) {
  let _token:any = sessionStorage.getItem('token');

  let _headers:any ={
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json',
    'token':_token
  }
  config.headers =  _headers;
  console.log(config);
  return config;
}, function (error) {
  return Promise.reject(error);
});

//Response
axios.interceptors.response.use(function (response) {
  return response;
}, function (error) {
  if(error.request.status == 0 && error.response.status == 0) {
    Swal.fire({
      icon: 'error',
      title: 'Error al conectarse con el servidor!',
      text: `${error.message}`,
    });
  }else{
    if(error.request.status >=200 && error.request.status < 300){
      if(error.response.data.status == false && error.response.data.message=='Error en autenticacion de token de seguridad'){
        sessionStorage.removeItem('token');
        const router: Router = appInjector().get(Router);
        router.navigate(['/login']);
      }
    }else{ 
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: `${error.message}`,
      })
    }
  }

  return Promise.reject(error);
});


@Injectable({
  providedIn: 'root'
})
export class FetchService {

  constructor() { }
}
