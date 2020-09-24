import { Component, OnInit } from '@angular/core';
import { NavController, AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

import { LoadingService } from '../services/loading/loading.service';
import { PopoverController } from '@ionic/angular';

import { ObrasService } from '../services/obras/obras.service';
import { ObraOpcionComponent } from '../obra-opcion/obra-opcion.component';



@Component({
  selector: 'app-obras',
  templateUrl: './obras.page.html',
  styleUrls: ['./obras.page.scss'],
})
export class ObrasPage implements OnInit {

  obras: any[] = [];

  constructor(
    public navCtrl: NavController,
    private alertCtrl: AlertController,
    private obrasService: ObrasService,
    private router: Router,
    private loadingService: LoadingService,
    private popoverCtrl: PopoverController,        
  ) { }

  ngOnInit() {            
  }
   
  ionViewWillEnter()
  {
    debugger;
    this.loadingService.showLoader();
    this.obrasService.getObras().subscribe(
      (data) =>
      {
        this.loadingService.hideLoader();               
        if (data["error"] == false)
        {
          data["data"].unshift({id:null});
          if (data["data"].length > 0){
            this.obras = data["data"];
          }          
        }
        else
        {
          this.showAlert("¡Error!", data["msj"]);
        }
      },
      (error) => {  this.loadingService.hideLoader(); this.showAlert("¡Error!", "Error WS Obras"); }
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

  agregarObra(){
    this.router.navigate(['/obra-form']);    
    // this.navCtrl.navigateForward("/obra-form");

  }

  async opcion(obra) {
    const popover = await this.popoverCtrl.create({
      component: ObraOpcionComponent,
      cssClass: 'my-custom-class',
      event: obra,
      translucent: true,
      componentProps: { data: obra },

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
