import { Component, OnInit } from '@angular/core';
import { PopoverController, NavParams } from '@ionic/angular';
import { Router } from '@angular/router';
import { NavController, AlertController } from '@ionic/angular';
import { ClientesService } from '../services/clientes/clientes.service';
import { LoadingService } from '../services/loading/loading.service';
import { EquiposService } from '../services/equipos/equipos.service';

@Component({
  selector: 'app-equipo-opcion',
  templateUrl: './equipo-opcion.component.html',
  styleUrls: ['./equipo-opcion.component.scss'],
})
export class EquipoOpcionComponent implements OnInit {
  equipo: any = { };

  constructor(
    private popoverCtrl: PopoverController,
    private router: Router,
    private navParams: NavParams,
    private alertCtrl: AlertController,  
    private equiposService: EquiposService,    
    public navCtrl: NavController,
    private loadingService: LoadingService
  ) { }

  ngOnInit() {
    this.equipo = this.navParams.get('data');
  }

  editarEquipo(){
    this.dismissPopover();
    this.router.navigate(['/equipo-form', this.equipo]);
  }

  borrarEquipo(){
    this.showConfirm();

  }

  verDetalle(){    
    this.dismissPopover();      
    this.router.navigate(['/equipo-info', this.equipo]);
  }  

  async dismissPopover() {
    await this.popoverCtrl.dismiss();
  }

  async showConfirm()
  {    
    const confirm = await this.alertCtrl.create({
      subHeader: 'Borrar',
      message: '¿Desea eliminar el equipo?',
      buttons: [
        {
          text: 'Cancelar',
          handler: () => { }
        },
        {
          text: 'Aceptar',
          handler: () => {
            this.loadingService.showLoader();  
                        
            this.equiposService.eliminarEquipo(this.equipo.id).subscribe(
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
                this.showAlert("¡Error!", "Error WS Equipo", false); }
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
