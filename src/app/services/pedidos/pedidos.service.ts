import { Injectable } from '@angular/core';
import { URL_SERVICIOS } from '../../config/url.servicios';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PedidosService {

  constructor(public http: HttpClient) { }
  
  getPedidosCount() { return this.http.get(URL_SERVICIOS + "Pedido/select_pedidos_obras"); }

  getPedidosByCampoEspecifico(campo, valor)
  {
    let url = URL_SERVICIOS + "Pedido/campo_especifico";

    let postData = new FormData();
    postData.append("campo", campo);
    postData.append("valor", valor);

    return this.http.post(url, postData);
  }

  getHistorialPedido(campo, valor)
  {
    let url = URL_SERVICIOS + "Pedido/historial_campo_especifico";

    let postData = new FormData();
    postData.append("campo", campo);
    postData.append("valor", valor);

    return this.http.post(url, postData);
  }

  registrarModificarPedido(data)
  {   
    return this.http.post(URL_SERVICIOS + "Pedido/registrar_modificar_pedido", JSON.stringify(data));
  }
  
  eliminarPedido(id)
  {
    let postData = {
      "id": id,     
      "estatus":1
    }
    return this.http.post(URL_SERVICIOS + "Pedido/eliminar_pedido", JSON.stringify(postData));
  }
  // registrarPedido(data)
  // {    
  //   return this.http.post(URL_SERVICIOS + "Pedido/registrar_pedido", JSON.stringify(data));
  // }
}
