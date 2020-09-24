import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/url.servicios';


@Injectable({
  providedIn: 'root'
})
export class ClientesService {

  constructor(
    public http: HttpClient
  ) { }

  getClientes(){ 
    return this.http.get(URL_SERVICIOS + "Cliente/select"); 
  }

  registrarModificarCliente(data){    
    return this.http.post(URL_SERVICIOS + "Cliente/registrar_modificar_cliente", JSON.stringify(data));
  }

  eliminarCliente(id)
  {
    let postData = {
      "id": id,     
      "estado":1
    }
    return this.http.post(URL_SERVICIOS + "Cliente/eliminar_cliente", JSON.stringify(postData));
  }
}
