import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PedidosService } from '../services/pedidos/pedidos.service';
import { NavController, AlertController } from '@ionic/angular';
import { LoadingService } from '../services/loading/loading.service';
import { PopoverController } from '@ionic/angular';
import { PedidoOpcionComponent } from '../pedido-opcion/pedido-opcion.component';
import { Router } from '@angular/router';



@Component({
  selector: 'app-pedidos-obra',
  templateUrl: './pedidos-obra.page.html',
  styleUrls: ['./pedidos-obra.page.scss'],
})


export class PedidosObraPage implements OnInit {

  obra: any = {};
  pedidos: any[] = [];

  constructor(
    private activatedroute: ActivatedRoute,
    private pedidosService: PedidosService,
    private alertCtrl: AlertController,
    private loadingService: LoadingService,
    private popoverCtrl: PopoverController,        
    private router: Router,
  ) { 
    this.activatedroute.params.subscribe(data => {
      console.log(data);
      this.obra = data;
    })   
  }

  ngOnInit() {
  }

  ionViewWillEnter()
  {    
    this.loadingService.showLoader();
    this.pedidosService.getPedidosByCampoEspecifico("fk_obra", this.obra.id).subscribe(
      (data) =>
      {
        this.loadingService.hideLoader();        
        if (data["error"] == false)
        {
          
          if (data["data"].length > 0){
            this.pedidos = data["data"];
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
    });
      buttons: ['OK']
    await promp.present();
  }

  async opcion(pedido) {
    const popover = await this.popoverCtrl.create({
      component: PedidoOpcionComponent,
      cssClass: 'my-custom-class',
      event: pedido,
      translucent: true,
      componentProps: { data: pedido },

    });
    popover.onDidDismiss().then(par => {
      if (par) {    

        if (par.data == 1)
            this.ionViewWillEnter(); 
      }
    });
    return await popover.present();
  }

  regresar(){
    this.router.navigate(['/tabs/pedidos']);                
  }

}
