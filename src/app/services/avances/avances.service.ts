import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { URL_SERVICIOS } from '../../config/url.servicios';

@Injectable({
  providedIn: 'root'
})
export class AvancesService {

  constructor(public http: HttpClient) { }

  getDias(fechaInicial, fechaFinal, fk_obra)
  {
    let url = URL_SERVICIOS + "Avance/dias_registrados";

    let postData = new FormData();
    postData.append("fechInicial", fechaInicial);
    postData.append("fechFinal", fechaFinal);
    postData.append("fk_obra", fk_obra);

    return this.http.post(url, postData);
  }

  getAvancesByCampoEspecifico(campo, valor)
  {
    let url = URL_SERVICIOS + "Avance/campo_especifico";

    let postData = new FormData();
    postData.append("campo", campo);
    postData.append("valor", valor);

    return this.http.post(url, postData);
  }

  registrarModificarAvance(data)
  {   
    debugger;
    return this.http.post(URL_SERVICIOS + "Avance/registrar_modificar_avance", JSON.stringify(data));
  }

  getfotos(valor)
  {
    let url = URL_SERVICIOS + "Avance/fotos";

    let postData = new FormData();
    postData.append("campo", "fk_detalle_obra");
    postData.append("valor", valor);

    return this.http.post(url, postData);
  }
  eliminarAvance(id)
  {
    let postData = {
      "id": id,     
      "estado":1
    }
    return this.http.post(URL_SERVICIOS + "Avance/eliminar_avance", JSON.stringify(postData));
  }

}
