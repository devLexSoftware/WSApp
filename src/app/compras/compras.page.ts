import { Component, OnInit } from '@angular/core';
import { ComprasService } from '../services/compras/compras.service';
import { NavController, AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

import { LoadingService } from '../services/loading/loading.service';
import { PopoverController } from '@ionic/angular';
import { CompraOpcionComponent } from '../compra-opcion/compra-opcion.component';
import { ObrasService } from '../services/obras/obras.service';



@Component({
  selector: 'app-compras',
  templateUrl: './compras.page.html',
  styleUrls: ['./compras.page.scss'],
})
export class ComprasPage implements OnInit {

  obras: any[] = [];

  constructor(
    public navCtrl: NavController,
    private alertCtrl: AlertController,
    private comprasService: ComprasService,
    private router: Router,
    private loadingService: LoadingService,
    private popoverCtrl: PopoverController,  
    private obrasService: ObrasService,

  ) { }

  ngOnInit() {
    
  }

  salir(){
    navigator['app'].exitApp();
  }

  ionViewWillEnter(): void{
    this.loadingService.showLoader();
    this.comprasService.getComprasCount().subscribe(
      (data) =>
      {
        debugger;
        this.loadingService.hideLoader();
        if (data["error"] == false)
        {
          data["data"].unshift({id:null});
          if (data["data"].length > 0)
          {            
            this.obras = data["data"];
          }
          else
          { this.showAlert("¡Ups!", "No hay compras registrados"); }
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

  agregarCompra(){
    this.router.navigate(['/compra-form']);
  }

  verCompras(obra){
    this.router.navigate(['/compras-obra', obra]);
  }

  async opcion(compra) {
    const popover = await this.popoverCtrl.create({
      component: CompraOpcionComponent,
      cssClass: 'my-custom-class',
      event: compra,
      translucent: true,
      componentProps: { data: compra },

    });
    return await popover.present();
  }

  async dismissPopover() {
    await this.popoverCtrl.dismiss();
  }

}
