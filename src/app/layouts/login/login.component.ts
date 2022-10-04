import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import axios from 'axios';
import Swal from 'sweetalert2';

import { const_locales } from "@constants/constants";
import { AuthService } from "@services/auth.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private authService:AuthService, private router:Router) { }

  ngOnInit(): void {
  }


  login_loader: boolean = false;
  alert_danger: boolean = false;

  //FORMS
  loginForm = new FormGroup({
    usuario: new FormControl('', [Validators.required]),
    contrasena: new FormControl('', [Validators.required]),
  });



  login() {
    this.login_loader = true;
    this.loginForm.markAllAsTouched();
    let data = this.loginForm.value;
    axios.post(`${const_locales.baseURL}/login`, data).then((response) => {
      if(response.data.status == false){
        this.alert_danger = true;
      }else{
        sessionStorage.setItem('token',response.data.response);
        this.router.navigate(['/lecturas']);
      }
    }).catch((error) => {
      if (error.response.status == 0 && error.request.status == 0) {
        Swal.fire({
          icon: 'error',
          title: 'Error al conectarse con el servidor!',
          text: `${error.message}`,
        });
      }
    }).finally(()=>{
      this.login_loader = false;
    });
  }

}
