import { Component, OnInit } from '@angular/core';
import { PopoverController, NavParams,AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { ProveedoresService } from '../services/proveedores/proveedores.service';
import { LoadingService } from '../services/loading/loading.service';


@Component({
  selector: 'app-proveedor-opcion',
  templateUrl: './proveedor-opcion.component.html',
  styleUrls: ['./proveedor-opcion.component.scss'],
})
export class ProveedorOpcionComponent implements OnInit {
  provedor: any = { };

  constructor(
    private popoverCtrl: PopoverController,
    private router: Router,
    private navParams: NavParams,
    private alertCtrl: AlertController,  
    private loadingService: LoadingService,
    private proveedoresService: ProveedoresService,
    

  ) { }

  ngOnInit() {
    this.provedor = this.navParams.get('data');
  }

  editarProveedor(){
    this.dismissPopover();
    this.router.navigate(['/proveedor-form', this.provedor]);
  }

  borrarProveedor(){
    this.showConfirm()
  }

  verDetalle(){    
    this.dismissPopover();      
    this.router.navigate(['/proveedor-info', this.provedor]);
  }  

  async dismissPopover() {
    await this.popoverCtrl.dismiss();
  }

  async showConfirm()
  {    
    const confirm = await this.alertCtrl.create({
      subHeader: 'Borrar',
      message: '¿Desea eliminar el proveedor?',
      buttons: [
        {
          text: 'Cancelar',
          handler: () => { }
        },
        {
          text: 'Aceptar',
          handler: () => {
            this.loadingService.showLoader();  
                        
            this.proveedoresService.eliminarProveedor(this.provedor.id).subscribe(
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
                this.showAlert("¡Error!", "Error WS Proveedor", false); }
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
