import { Component, OnInit } from '@angular/core';
import { ClientesService } from '../services/clientes/clientes.service';
import { NavController, AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

import { LoadingService } from '../services/loading/loading.service';
import { PopoverController } from '@ionic/angular';
import { ClienteOpcionComponent } from '../cliente-opcion/cliente-opcion.component';



// import { CallNumber } from '@ionic-native/core';



@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.page.html',
  styleUrls: ['./clientes.page.scss'],
})
export class ClientesPage implements OnInit {

  clientes: any[] = [];

  constructor(
    public navCtrl: NavController,
    private alertCtrl: AlertController,
    private clienteService: ClientesService,
    private router: Router,
    private loadingService: LoadingService,
    private popoverCtrl: PopoverController,    
    // private callNumber: CallNumber
  ) { }

  ngOnInit(){}

  ionViewWillEnter(){
    this.loadingService.showLoader();    
    this.clienteService.getClientes().subscribe(
      (data) =>
      {
        this.loadingService.hideLoader();                       
        if (data["error"] == false)
        {
          data["data"].unshift({id:null});
          if (data["data"].length > 0)
          {
            // this.loadingService.hideLoader();                   
            this.clientes = data["data"];
          }
          else
          { this.showAlert("¡Ups!", "No hay clientes registrados"); }
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

  agregarCliente(){
    this.router.navigate(['/cliente-form']);
  }

  async opcion(cliente) {
    const popover = await this.popoverCtrl.create({
      component: ClienteOpcionComponent,
      cssClass: 'my-custom-class',
      event: cliente,
      translucent: true,
      componentProps: { data: cliente },

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
