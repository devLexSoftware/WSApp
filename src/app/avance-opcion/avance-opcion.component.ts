import { Component, OnInit } from '@angular/core';
import { PopoverController, NavParams } from '@ionic/angular';
import { Router } from '@angular/router';
import { NavController, AlertController } from '@ionic/angular';
import { AvancesService } from '../services/avances/avances.service';
import { LoadingService } from '../services/loading/loading.service';

@Component({
  selector: 'app-avance-opcion',
  templateUrl: './avance-opcion.component.html',
  styleUrls: ['./avance-opcion.component.scss'],
})
export class AvanceOpcionComponent implements OnInit {

  avance: any = { };
  obj: any[] = [];  
  url = "/avances-obra";  

  constructor(
    private popoverCtrl: PopoverController,
    private router: Router,
    private navParams: NavParams,
    private alertCtrl: AlertController,  
    private avancesService: AvancesService,
    public navCtrl: NavController,
    private loadingService: LoadingService
  ) { }

  ngOnInit() {
    this.avance = this.navParams.get('data');
    this.avance.url = this.url;
  }

  editarAvance(){
    this.dismissPopover();
    this.router.navigate(['/avance-form', this.avance]);
  }

  borrarAvance(){
    this.showConfirm();

  }

  verDetalle(){    
    this.dismissPopover();      
    this.router.navigate(['/avance-info', this.avance]);
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
                        
            this.avancesService.eliminarAvance(this.avance.id).subscribe(
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
                this.showAlert("¡Error!", "Error WS Avance", false); }
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
