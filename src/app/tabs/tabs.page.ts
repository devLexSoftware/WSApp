import { Component } from '@angular/core';
import { UsersService } from '../services/users/users.service';


@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {

  usuario: string = "";

  constructor(
    private usersService: UsersService,
  ) {
    this.usuario = this.usersService.logeedUserObj.perfil;    
  }

}
