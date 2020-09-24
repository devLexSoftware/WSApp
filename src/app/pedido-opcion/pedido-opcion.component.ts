import { Component, OnInit } from '@angular/core';
import { PopoverController, NavParams } from '@ionic/angular';
import { Router } from '@angular/router';
import { NavController, AlertController } from '@ionic/angular';
import { PedidosService } from '../services/pedidos/pedidos.service';

import { LoadingService } from '../services/loading/loading.service';

@Component({
  selector: 'app-pedido-opcion',
  templateUrl: './pedido-opcion.component.html',
  styleUrls: ['./pedido-opcion.component.scss'],
})
export class PedidoOpcionComponent implements OnInit {
  pedido: any = { };
  obj: any[] = [];  
  url = "/pedidos-obra";  
 
  constructor(
    private popoverCtrl: PopoverController,
    private router: Router,
    private navParams: NavParams,
    private alertCtrl: AlertController,  
    private pedidosService: PedidosService,
    public navCtrl: NavController,
    private loadingService: LoadingService
  ) {         
  }

  ngOnInit() {    
    this.pedido = this.navParams.get('data');        
    this.pedido.url = this.url;
  }

  editarPedido(){
    this.dismissPopover();
    this.router.navigate(['/pedido-form', this.pedido]);    
  }

  borrarPedido(){
    this.showConfirm();
  }

  verDetalle(){    
    this.dismissPopover();      
    this.router.navigate(['/pedido-info', this.pedido]);
  }  

  async dismissPopover() {
    await this.popoverCtrl.dismiss();
  }

  async showConfirm()
  {    
    const confirm = await this.alertCtrl.create({
      subHeader: 'Borrar',
      message: '¿Desea eliminar el avance?',
      buttons: [
        {
          text: 'Cancelar',
          handler: () => { }
        },
        {
          text: 'Aceptar',
          handler: () => {
            this.loadingService.showLoader();  
                        
            this.pedidosService.eliminarPedido(this.pedido.id).subscribe(
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
                this.showAlert("¡Error!", "Error WS Cliente", false); }
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
