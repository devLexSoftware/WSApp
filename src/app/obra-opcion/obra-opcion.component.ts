import { Component, OnInit } from '@angular/core';
import { PopoverController, NavParams } from '@ionic/angular';
import { Router } from '@angular/router';
import { LoadingService } from '../services/loading/loading.service';
import { NavController, AlertController } from '@ionic/angular';
import { ObrasService } from '../services/obras/obras.service';

@Component({
  selector: 'app-obra-opcion',
  templateUrl: './obra-opcion.component.html',
  styleUrls: ['./obra-opcion.component.scss'],
})
export class ObraOpcionComponent implements OnInit {
  obra: any = { };

  constructor(
    private popoverCtrl: PopoverController,
    private router: Router,
    private navParams: NavParams,
    public navCtrl: NavController,
    private loadingService: LoadingService,
    private alertCtrl: AlertController,  
    private obrasService: ObrasService,

  ) { }

  ngOnInit() {
    this.obra = this.navParams.get('data');
  }

  editarObra(){
    this.dismissPopover();
    this.router.navigate(['/obra-form', this.obra]);    
  }

  borrarObra(){
    this.showConfirm();
  }

  verDetalle(){    
    this.dismissPopover();      
    this.router.navigate(['/obra-info', this.obra]);
  }  

  async dismissPopover() {
    await this.popoverCtrl.dismiss();
  }

  async showConfirm()
  {    
    const confirm = await this.alertCtrl.create({
      subHeader: 'Borrar',
      message: '¿Desea eliminar la obra?',
      buttons: [
        {
          text: 'Cancelar',
          handler: () => { }
        },
        {
          text: 'Aceptar',
          handler: () => {
            this.loadingService.showLoader();              
            this.obrasService.eliminarObra(this.obra.id).subscribe(
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
