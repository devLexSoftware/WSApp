import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { URL_SERVICIOS } from '../../config/url.servicios';


@Injectable({
  providedIn: 'root'
})
export class ComprasService {

  constructor(public http: HttpClient)
  { }

  getCompras()
  { return this.http.get(URL_SERVICIOS + "Compra/select"); }

  getComprasCount() { return this.http.get(URL_SERVICIOS + "Compra/select_compras_obras"); }

  getComprasByCampoEspecifico(campo, valor)
  {
    let url = URL_SERVICIOS + "Compra/campo_especifico";

    let postData = new FormData();
    postData.append("campo", campo);
    postData.append("valor", valor);

    return this.http.post(url, postData);
  }

  registrarModificarCompra(data)
  {   
    debugger;
    return this.http.post(URL_SERVICIOS + "Compra/registrar_modificar_compra", JSON.stringify(data));
  }

  eliminarCompra(id)
  {
    let postData = {
      "id": id,     
      "estado":1
    }
    return this.http.post(URL_SERVICIOS + "compra/eliminar_compra", JSON.stringify(postData));
  }
}
