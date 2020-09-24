import { Component, OnInit } from '@angular/core';
import { NavController, AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

import { LoadingService } from '../services/loading/loading.service';
import { PopoverController } from '@ionic/angular';

import { ObrasService } from '../services/obras/obras.service';
import { PedidosService } from '../services/pedidos/pedidos.service';



@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.page.html',
  styleUrls: ['./pedidos.page.scss'],
})
export class PedidosPage implements OnInit {

  obras: any[] = [];

  constructor(
    public navCtrl: NavController,
    private alertCtrl: AlertController,
    private obrasService: ObrasService,
    private router: Router,
    private loadingService: LoadingService,
    private popoverCtrl: PopoverController,        
    private pedidosService: PedidosService,
    
  ) { }
  salir(){
    navigator['app'].exitApp();
  }
  ngOnInit() {
  }
  
  ionViewWillEnter(): void{
    this.loadingService.showLoader();    
    this.pedidosService.getPedidosCount().subscribe(
      (data) =>
      {
        this.loadingService.hideLoader();
        debugger;        
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
      (error) => { 
        this.loadingService.hideLoader();      
        this.showAlert("¡Error!", "Error WS Obras"); }
    );

  }

  agregarPedido(){
    this.router.navigate(['/pedido-form']);
  }

  verPedidos(obra){
    this.router.navigate(['/pedidos-obra', obra]);
  }

  async showAlert(title, subtitle)
  {
    const promp = await this.alertCtrl.create(
    {
      message: title,
      subHeader: subtitle,
    });
      buttons: ['OK']
    await promp.present();
  }

}
