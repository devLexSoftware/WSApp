import { Component, OnInit } from '@angular/core';
import { AvancesService } from '../services/avances/avances.service';
import { NavController, AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

import { LoadingService } from '../services/loading/loading.service';
import { PopoverController } from '@ionic/angular';
import { AvanceOpcionComponent } from '../avance-opcion/avance-opcion.component';
import { ObrasService } from '../services/obras/obras.service';


@Component({
  selector: 'app-avances',
  templateUrl: './avances.page.html',
  styleUrls: ['./avances.page.scss'],
})
export class AvancesPage implements OnInit {

  obras: any[] = [];

  constructor(
    public navCtrl: NavController,
    private alertCtrl: AlertController,
    private avancesService: AvancesService,
    private router: Router,
    private loadingService: LoadingService,
    private popoverCtrl: PopoverController,  
    private obrasService: ObrasService,
  ) { }
  salir(){
    navigator['app'].exitApp();
  }
  ngOnInit() {
    this.loadingService.showLoader();
    this.obrasService.getObras().subscribe(
      (data) =>
      {
        this.loadingService.hideLoader();        
        if (data["error"] == false)
        {
          data["data"].unshift({id:null});
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

  async showAlert(title, subtitle)
  {
    const promp = await this.alertCtrl.create(
    {
      message: title,
      subHeader: subtitle,
      buttons: ['OK']
    });
    await promp.present();
  }

  agregarAvance(){
    this.router.navigate(['/avance-form']);
  }

  verAvance(obra){
    this.router.navigate(['/avances-obra', obra]);
  }

  async opcion(avance) {
    const popover = await this.popoverCtrl.create({
      component: AvanceOpcionComponent,
      cssClass: 'my-custom-class',
      event: avance,
      translucent: true,
      componentProps: { data: avance },

    });
    return await popover.present();
  }

  async dismissPopover() {
    await this.popoverCtrl.dismiss();
  }

  regresar(){
    this.router.navigate(['/tabs/avances']);                
  }

}
