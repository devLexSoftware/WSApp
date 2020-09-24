import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/url.servicios';


@Injectable({
  providedIn: 'root'
})
export class UsersService {
  
  public logeedUserId: number = -1;
  public logeedUserPerfil: string = "none";
  public logeedUserObj: any = {};
  constructor(public http: HttpClient) { 

  }

  getUsers(data)
  {    
    return this.http.post(URL_SERVICIOS + "User/select", JSON.stringify(data));
  }
}
