import { Injectable } from '@angular/core';
import { URL_SERVICIOS } from '../../config/url.servicios';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ObrasService {

  constructor(public http: HttpClient) { }


  getObras() { return this.http.get(URL_SERVICIOS + "Obra/select"); }

  getVwInfoObrasSelect() { return this.http.get(URL_SERVICIOS + "Obra/vw_info_obras_select"); }

  registrarModificarObra(data)
  {   
    return this.http.post(URL_SERVICIOS + "Obra/registrar_modificar_obra", JSON.stringify(data));
  }

  getObraByCampoEspecifico(campo, valor)
  {
    let url = URL_SERVICIOS + "Obra/campo_especifico";

    let postData = new FormData();
    postData.append("campo", campo);
    postData.append("valor", valor);

    return this.http.post(url, postData);
  }

  eliminarObra(id)
  {        
    let postData = {
      "id": id,
      "estado":1
    }

    return this.http.post(URL_SERVICIOS + "Obra/eliminar_obra", JSON.stringify(postData));
  }
  
}
