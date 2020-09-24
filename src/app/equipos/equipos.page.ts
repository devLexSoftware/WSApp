import { Component, OnInit } from '@angular/core';
import { NavController, AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

import { LoadingService } from '../services/loading/loading.service';
import { PopoverController } from '@ionic/angular';

import { EquiposService } from '../services/equipos/equipos.service';
import { EquipoOpcionComponent } from '../equipo-opcion/equipo-opcion.component';


@Component({
  selector: 'app-equipos',
  templateUrl: './equipos.page.html',
  styleUrls: ['./equipos.page.scss'],
})
export class EquiposPage implements OnInit {

  equipos: any[] = [];


  constructor(
    public navCtrl: NavController,
    private alertCtrl: AlertController,
    private equiposService: EquiposService,
    private router: Router,
    private loadingService: LoadingService,
    private popoverCtrl: PopoverController,
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter(): void
  {
    this.loadingService.showLoader();
    
    this.equiposService.getEquipos().subscribe(
      (data) =>
      {
        this.loadingService.hideLoader();         
        if (data["error"] == false)
        {
          data["data"].unshift({id:null});
          if (data["data"].length > 0){
            this.equipos = data["data"];
          }          
        }
        else
        {
          this.showAlert("¡Error!", data["msj"]);
        }
      },
      (error) => { 
        this.loadingService.hideLoader();      
        this.showAlert("¡Error!", "Error WS Equipos"); }
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

  agregarEquipo(){
    this.router.navigate(['/equipo-form']);
  }

  async opcion(equipo) {
    const popover = await this.popoverCtrl.create({
      component: EquipoOpcionComponent,
      cssClass: 'my-custom-class',
      event: equipo,
      translucent: true,
      componentProps: { data: equipo },

    });
    popover.onDidDismiss().then(par => {
      if (par) {    

        if (par.data == 1)
            this.ionViewWillEnter(); 
      }
    });
    return await popover.present();
  }

}
