import { Component, OnInit } from '@angular/core';
import { UsersService } from '../services/users/users.service';
import { NavController, AlertController, Platform } from '@ionic/angular';


@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  usuario: string = "";
  constructor(
    private usersService: UsersService,
    public navCtrl: NavController,
    private platform: Platform

  ) { 
    this.usuario = this.usersService.logeedUserObj.perfil;

  }

  ngOnInit() {
  }

  salir(){
    navigator['app'].exitApp();
  }
}
