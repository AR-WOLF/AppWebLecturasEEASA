import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FetchService } from "@services/fetch.service";
import axios from 'axios';
import { const_locales } from "@constants/constants";

import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-lecturas',
  templateUrl: './lecturas.component.html',
  styleUrls: ['./lecturas.component.css']
})
export class LecturasComponent implements OnInit {

  constructor(private fetchService:FetchService, private modalService: NgbModal, private activatedRouter:ActivatedRoute) { }

  ngOnInit(): void {
    let _numC = this.activatedRouter.snapshot.params["cuenta"];
    this.buscarLecturaRouter(_numC);
  }
  //VARIABLES
  listaMedidores: any = [];

  loader_status:boolean = false;

  loaderImage_status:boolean = false;

  closeResult = '';
  //========================================FORMS
  unidad_form: FormGroup | any;

  searchForm = new FormGroup({
    cadena: new FormControl('')
  });


  imagenMedidor:any = '';


  //CRUD 

  buscarLectura() {
    this.loader_status = true;
    this.listaMedidores = [];
    let _cuenta = this.searchForm.value.cadena;
    if (_cuenta == null) { return }

    axios.get(`${const_locales.baseURL}/listadoCuentaLecturas?cuenta=${_cuenta}`)
      .then((response) => {
        this.listaMedidores = response.data.response;
        this.getImage();
      }).finally(() => {
        this.loader_status = false;
      });
  }

  buscarLecturaRouter(_num_cuenta:any) {
    this.loader_status = true;
    this.listaMedidores = [];
    if (_num_cuenta == null || _num_cuenta.trim() == "" || _num_cuenta == undefined) { 
      this.loader_status = false;
      return;
    }
    axios.get(`${const_locales.baseURL}/listadoCuentaLecturas?cuenta=${_num_cuenta}`)
      .then((response) => {
        this.listaMedidores = response.data.response;
        this.getImage();
      }).finally(() => {
        this.loader_status = false;
      });
  }


  //========================================MODALES
  abrirModalFoto(content:any, _nombreImagen:any) {
    this.getImage(_nombreImagen);
    this.modalService.open(content, { size: 'lg',scrollable: true  }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
      this.imagenMedidor = '';
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      this.imagenMedidor = '';
    });
  }


  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }



  private getImage(_dirImage:any = ''){

      this.loaderImage_status = true;
      if(_dirImage == '' || _dirImage == null || _dirImage == undefined){
        this.loaderImage_status = false;
        _dirImage = '';
        return;
      }
      let _url = `${const_locales.baseURL}/fotoLectura?archivo=${_dirImage}`;
      axios.get(_url)
      .then((response)=>{
        if(response.data.response == null){
          this.imagenMedidor = '';
          return;
        }
        let bytes =  response.data.response;
        let uints:any = new Uint8Array(bytes);
        let base64 = btoa(String.fromCharCode.apply(null, uints));
        let _dataImage = 'data:image/jpeg;base64,' + base64; 
        this.imagenMedidor = _dataImage;
      }).catch(()=>{
        this.imagenMedidor = '';
      }).finally(()=>{
        this.loaderImage_status = false;
      })
  }





}
