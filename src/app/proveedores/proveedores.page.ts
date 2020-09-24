import { Component, OnInit } from '@angular/core';
import { NavController, AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

import { LoadingService } from '../services/loading/loading.service';
import { PopoverController } from '@ionic/angular';

import { ProveedoresService } from '../services/proveedores/proveedores.service';
import { ProveedorOpcionComponent } from '../proveedor-opcion/proveedor-opcion.component';

@Component({
  selector: 'app-proveedores',
  templateUrl: './proveedores.page.html',
  styleUrls: ['./proveedores.page.scss'],
})
export class ProveedoresPage implements OnInit {

  proveedores: any[] = [];

  constructor(
    public navCtrl: NavController,
    private alertCtrl: AlertController,
    private proveedoresService: ProveedoresService,
    private router: Router,
    private loadingService: LoadingService,
    private popoverCtrl: PopoverController,        
  ) { }

  ngOnInit() {
  }


  ionViewWillEnter(): void
  {
    this.loadingService.showLoader();    
    this.proveedoresService.getProveedores().subscribe(
      (data) =>
      {
        this.loadingService.hideLoader();             
        if (data["error"] == false)
        {
          data["data"].unshift({id:null});
          if (data["data"].length > 0){
            this.proveedores = data["data"];
          }          
        }
        else
        {
          this.showAlert("¡Error!", data["msj"]);
        }
      },
      (error) => { 
        this.loadingService.hideLoader();      
        this.showAlert("¡Error!", "Error WS Obras"); }
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

  agregarProveedor(){
    this.router.navigate(['/proveedor-form']);
  }

  async opcion(proveedor) {
    const popover = await this.popoverCtrl.create({
      component: ProveedorOpcionComponent,
      cssClass: 'my-custom-class',
      event: proveedor,
      translucent: true,
      componentProps: { data: proveedor },
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
