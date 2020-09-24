import { Component, OnInit } from '@angular/core';
import { PopoverController, NavParams } from '@ionic/angular';
import { Router } from '@angular/router';
import { LoadingService } from '../services/loading/loading.service';
import { NavController, AlertController } from '@ionic/angular';
import { EmpleadosService } from '../services/empleados/empleados.service';

@Component({
  selector: 'app-empleado-opcion',
  templateUrl: './empleado-opcion.component.html',
  styleUrls: ['./empleado-opcion.component.scss'],
})
export class EmpleadoOpcionComponent implements OnInit {
  empleado: any = { };

  constructor(
    private popoverCtrl: PopoverController,
    private router: Router,
    private navParams: NavParams,
    public navCtrl: NavController,
    private loadingService: LoadingService,
    private alertCtrl: AlertController,  
    private empleadosService: EmpleadosService,

  ) { }

  ngOnInit() {
    this.empleado = this.navParams.get('data');
  }

  editarEmpleado(){
    this.dismissPopover();
    this.router.navigate(['/empleado-form', this.empleado]);
  }

  borrarEmpleado(){
    this.showConfirm();

  }

  verDetalle(){    
    this.dismissPopover();      
    this.router.navigate(['/empleado-info', this.empleado]);
  }  

  async dismissPopover() {
    await this.popoverCtrl.dismiss();
  }
  async showConfirm()
  {    
    const confirm = await this.alertCtrl.create({
      subHeader: 'Borrar',
      message: '¿Desea eliminar el empleado?',
      buttons: [
        {
          text: 'Cancelar',
          handler: () => { }
        },
        {
          text: 'Aceptar',
          handler: () => {
            this.loadingService.showLoader();  
                        
            this.empleadosService.eliminarEmpleado(this.empleado.id).subscribe(
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
