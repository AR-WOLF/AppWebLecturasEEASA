import { Component, OnInit } from '@angular/core';
import { FetchService } from "@services/fetch.service";
import axios from 'axios';
import { const_locales } from "@constants/constants";
import { Router } from '@angular/router';


@Component({
  selector: 'app-lista-mediciones',
  templateUrl: './lista-mediciones.component.html',
  styleUrls: ['./lista-mediciones.component.css']
})
export class ListaMedicionesComponent implements OnInit {

  constructor(private fetchService:FetchService,private router:Router) { }

  ngOnInit(): void {
    this.obtenerMediciones();
  }

  spin_loader: boolean = false;

  lista_mediciones: any = [];

  p:any=1;



  obtenerMediciones(){
    this.spin_loader = true;
    this.lista_mediciones = [];
    axios.get(`${const_locales.baseURL}/listadoUsuariosMedidores?sDesde=1&sHasta=1`)
    .then((response)=>{
      this.lista_mediciones = response.data.response;
    })
    .catch((error)=>{
      this.lista_mediciones = [];
    })
    .finally(()=>{
      this.spin_loader = false;
    });
  }




  lanzarLectura(_cuenta:any){
    this.router.navigate([`/lecturas/${_cuenta}`])
  }








}
