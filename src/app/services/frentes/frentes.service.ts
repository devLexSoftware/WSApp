import { Injectable } from '@angular/core';
import { URL_SERVICIOS } from '../../config/url.servicios';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class FrentesService {

  constructor(public http: HttpClient) { }
  
  getFrentes() { return this.http.get(URL_SERVICIOS + "Frente/select"); }

}
