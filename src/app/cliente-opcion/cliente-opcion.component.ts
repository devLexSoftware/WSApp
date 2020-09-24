import { Component, OnInit } from '@angular/core';
import { PopoverController, NavParams } from '@ionic/angular';
import { Router } from '@angular/router';
import { NavController, AlertController } from '@ionic/angular';
import { ClientesService } from '../services/clientes/clientes.service';
import { LoadingService } from '../services/loading/loading.service';


@Component({
  selector: 'app-cliente-opcion',
  templateUrl: './cliente-opcion.component.html',
  styleUrls: ['./cliente-opcion.component.scss'],
})
export class ClienteOpcionComponent implements OnInit {
  cliente: any = { };

  constructor(
    private popoverCtrl: PopoverController,
    private router: Router,
    private navParams: NavParams,
    private alertCtrl: AlertController,  
    private clienteService: ClientesService,
    public navCtrl: NavController,
    private loadingService: LoadingService
  ) { }

  ngOnInit() {    
    this.cliente = this.navParams.get('data');
  }

  editarCliente(){
    this.dismissPopover();
    this.router.navigate(['/cliente-form', this.cliente]);
  }

  borrarCliente(){
    this.showConfirm();
  }

  verDetalle(){    
    this.dismissPopover();      
    this.router.navigate(['/cliente-info', this.cliente]);
  }

  llamarCliente(){
    
  }

  async dismissPopover() {
    await this.popoverCtrl.dismiss(0);
  }

  async showConfirm()
  {    
    const confirm = await this.alertCtrl.create({
      subHeader: 'Borrar',
      message: '¿Desea eliminar el cliente?',
      buttons: [
        {
          text: 'Cancelar',
          handler: () => { }
        },
        {
          text: 'Aceptar',
          handler: () => {
            this.loadingService.showLoader();  
                        
            this.clienteService.eliminarCliente(this.cliente.id).subscribe(
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
