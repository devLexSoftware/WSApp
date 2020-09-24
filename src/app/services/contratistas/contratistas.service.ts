import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { URL_SERVICIOS } from '../../config/url.servicios';

@Injectable({
  providedIn: 'root'
})
export class ContratistasService {

  constructor(public http: HttpClient)
  {}

  getContratistas()
  { return this.http.get(URL_SERVICIOS + "Contratista/select"); }
}
