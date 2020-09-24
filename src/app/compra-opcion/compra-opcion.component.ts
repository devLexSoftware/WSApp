import { Component, OnInit } from '@angular/core';
import { PopoverController, NavParams } from '@ionic/angular';
import { Router } from '@angular/router';
import { LoadingService } from '../services/loading/loading.service';
import { NavController, AlertController } from '@ionic/angular';
import { ComprasService } from '../services/compras/compras.service';


@Component({
  selector: 'app-compra-opcion',
  templateUrl: './compra-opcion.component.html',
  styleUrls: ['./compra-opcion.component.scss'],
})
export class CompraOpcionComponent implements OnInit {

  compra: any = { };
  obj: any[] = [];  
  url = "/compras-obra";  

  constructor(
    private popoverCtrl: PopoverController,
    private router: Router,
    private navParams: NavParams,
    public navCtrl: NavController,
    private loadingService: LoadingService,
    private alertCtrl: AlertController,  
    private comprasService: ComprasService
  ) { }

  ngOnInit() {
    this.compra = this.navParams.get('data');
    this.compra.url = this.url;
  }

  editarCompra(){
    this.dismissPopover();
    this.router.navigate(['/compra-form', this.compra]);
  }

  borrarCompra(){
    this.showConfirm();
  }

  verDetalle(){    
    this.dismissPopover();      
    this.router.navigate(['/compra-info', this.compra]);
  }
  

  async dismissPopover() {
    await this.popoverCtrl.dismiss();
  }

  async showConfirm()
  {    
    const confirm = await this.alertCtrl.create({
      subHeader: 'Borrar',
      message: '¿Desea eliminar la compra?',
      buttons: [
        {
          text: 'Cancelar',
          handler: () => { }
        },
        {
          text: 'Aceptar',
          handler: () => {
            this.loadingService.showLoader();  
                        
            this.comprasService.eliminarCompra(this.compra.id).subscribe(
              (data) =>
              {
                this.loadingService.hideLoader();
                if (data["error"] == false)
                {
                  this.showAlert("¡Correcto!", data["msj"],true);                  
                }
                else
                {
                  this.showAlert("¡Error!", data["msj"], false);
                }
              },
              (error) => {
                this.loadingService.hideLoader();
                this.showAlert("¡Error!", "Error WS Compra", false); }
            );
          }
        }
      ]
    });    
    await confirm.present();
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
          handler: data => {
            if (regresar)
            {    
              this.popoverCtrl.dismiss(1);
            }
          }
        }]
    });
    await promp.present();
  }

}
