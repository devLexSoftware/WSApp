import { Component, OnInit } from '@angular/core';
import { AvancesService } from '../services/avances/avances.service';
import { NavController, AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

import { LoadingService } from '../services/loading/loading.service';
import { PopoverController } from '@ionic/angular';
import { AvanceOpcionComponent } from '../avance-opcion/avance-opcion.component';
import { ObrasService } from '../services/obras/obras.service';

import { UsersService } from '../services/users/users.service';


@Component({
  selector: 'app-user-cliente',
  templateUrl: './user-cliente.page.html',
  styleUrls: ['./user-cliente.page.scss'],
})
export class UserClientePage implements OnInit {

  obras: any[] = [];

  constructor(
    public navCtrl: NavController,
    private alertCtrl: AlertController,
    private avancesService: AvancesService,
    private router: Router,
    private loadingService: LoadingService,
    private popoverCtrl: PopoverController,  
    private obrasService: ObrasService,
    private usersService: UsersService,
  ) { 
    
  }

  ngOnInit() {
  }
  salir(){
    navigator['app'].exitApp();
  }
  ionViewWillEnter() {
    //this.usersService.logeedUserObj.fk_vinculada
    this.loadingService.showLoader();
    this.obrasService.getObraByCampoEspecifico('fk_clientes', this.usersService.logeedUserObj.fk_vinculada).subscribe(
      (data) =>
      {
        this.loadingService.hideLoader();        
        if (data["error"] == false)
        {          
          if (data["data"].length > 0)
          {            
            this.obras = data["data"];
          }
          else
          { this.showAlert("¡Ups!", "No hay obras registrados"); }
        }
        else
        {
          this.showAlert("¡Error!", data["msj"]);
        }
      },
      (error) => { 
        this.loadingService.hideLoader();
        
        this.showAlert("¡Error!", "Ocurrio un error en los datos"); 
        console.error(error); 
      }
    );
    
  }

  verAvance(obra){
    this.router.navigate(['/user-cliente-avance', obra]);
  }
  
  async showAlert(title, subtitle)
  {
    const promp = await this.alertCtrl.create(
    {
      message: subtitle,
      subHeader: title,
      buttons: ['OK']
    });
    await promp.present();
  }

}
