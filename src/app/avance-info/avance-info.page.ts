import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AvancesService } from '../services/avances/avances.service';
import { NavController, AlertController } from '@ionic/angular';
import { LoadingService } from '../services/loading/loading.service';

import { ImageModalPage } from '../image-modal/image-modal.page';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-avance-info',
  templateUrl: './avance-info.page.html',
  styleUrls: ['./avance-info.page.scss'],
})
export class AvanceInfoPage implements OnInit {

  avance: any = { };
  imagenes: any[] = [];


  constructor(
    private activatedroute: ActivatedRoute,
    private avanceService: AvancesService,
    public alertCtrl: AlertController,
    private loadingService: LoadingService,
    public modalCtrl: ModalController,

    ) { 
    this.activatedroute.params.subscribe(data => {      
      this.avance = data;
    })    
  }

  ngOnInit() {
    
  }

  getFotos(){
    
    this.loadingService.showLoader();
    this.avanceService.getfotos(this.avance.id).subscribe(
      (data) =>
      {        
        this.loadingService.hideLoader();
        if (data["error"] == false)
        {
          if (data["data"].length > 0)
          {
            
            data["data"].forEach(element => {
              
              this.imagenes.push(element.imagen);
            });
            // this.imagenes = data["data"];
          }
          else
          { this.showAlert("¡Ups!", "No hay fotos registradas", true); }          
        }
        else
        {
          this.showAlert("¡Error!", data["msj"], true);
        }
      },
      (error) => { 
        this.loadingService.hideLoader();      
        console.error(error); }
    );
  }

  openImage(image){    
    this.modalCtrl.create({
      component: ImageModalPage,
      componentProps:{
        img: image
      }
    }).then(modal => modal.present());
  }

  async showAlert(title, subtitle, regresar)
  {
    const promp = await this.alertCtrl.create(
    {
      message: subtitle,
      subHeader: title,
      buttons: [
        {
          text: 'Ok',
          role: 'ok',          
        }]
    });
    await promp.present();
  }

}
